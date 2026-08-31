#!/usr/bin/env bash
#
# Fixture tests for bump-fleet.sh. No runner, no token, no network.
#
#   bash .github/scripts/tests/bump-fleet.test.sh
#
# This exists because every defect this script has shipped was silent. The
# pnpm probe that died at exit 123 took out 7 of 12 consumers and read as
# "Process completed with exit code 123" with no hint of the cause; the
# absolute-path lockfile bug made three repositories sit out a release while
# the run looked fine. Both were reproducible in a directory of fixture files
# and neither was caught, because there was nowhere to put the fixture.
#
# The cases that matter are the ones where "nothing happened" and "this does not
# apply" have to stay distinguishable — exit 4 versus exit 3 — and the layouts
# where a plausible-looking rewrite silently edits the wrong file.

set -uo pipefail

HERE=$(cd "$(dirname "$0")" && pwd -P)
BUMP="$HERE/../bump-fleet.sh"
[ -f "$BUMP" ] || { echo "cannot find bump-fleet.sh next to the tests"; exit 1; }

PASS=0
FAIL=0
ROOT=$(mktemp -d)
trap 'rm -rf "$ROOT"' EXIT

ok()   { PASS=$((PASS + 1)); printf '  ok    %s\n' "$1"; }
bad()  { FAIL=$((FAIL + 1)); printf '  FAIL  %s\n     %s\n' "$1" "$2"; }

# Each fixture is a real git checkout: --dry-run reverts by checking out, and
# refuses to run at all against a dirty tree.
mkfixture() {
  local d="$ROOT/$1"; mkdir -p "$d"; printf '%s\n' "$d"
}
commit() {
  ( cd "$1" && git init -q . && git add -A \
      && git -c user.email=t@t -c user.name=t commit -qm fixture )
}

expect_exit() {
  local want="$1" label="$2"; shift 2
  local out; out=$("$@" 2>&1); local got=$?
  if [ "$got" -eq "$want" ]; then ok "$label (exit $got)"
  else bad "$label" "expected exit $want, got $got: $(printf '%s' "$out" | tr '\n' ' ' | cut -c1-160)"; fi
}

expect_file() {
  local f="$1" pat="$2" label="$3"
  if grep -qF -- "$pat" "$f" 2>/dev/null; then ok "$label"
  else bad "$label" "'$pat' not found in ${f##*/}"; fi
}

expect_absent() {
  local f="$1" pat="$2" label="$3"
  if grep -qF -- "$pat" "$f" 2>/dev/null; then bad "$label" "'$pat' is still present in ${f##*/}"
  else ok "$label"; fi
}

# ─────────────────────────────────────────────────────────────────────────────
echo "standalone app repository (logic/Cargo.toml)"
# ─────────────────────────────────────────────────────────────────────────────
D=$(mkfixture standalone); mkdir -p "$D/logic"
cat > "$D/logic/Cargo.toml" <<'EOF'
[dependencies]
calimero-sdk = { git = "https://github.com/calimero-network/core", tag = "0.11.0-rc.1" }
calimero-storage = { git = "https://github.com/calimero-network/core.git", tag = "0.11.0-rc.1" }

[package.metadata.calimero]
min-runtime-version = "0.11.0-rc.1"
EOF
commit "$D"
expect_exit 0 "rewrites the pins" bash "$BUMP" --surface cargo --version 0.11.0-rc.2 --dir "$D" --no-lock
expect_file "$D/logic/Cargo.toml" 'tag = "0.11.0-rc.2"' "  tag moved"
expect_file "$D/logic/Cargo.toml" 'min-runtime-version = "0.11.0-rc.2"' "  floor moved with it"
expect_absent "$D/logic/Cargo.toml" '0.11.0-rc.1' "  no stale tag left"
expect_exit 4 "second run is a no-op" bash "$BUMP" --surface cargo --version 0.11.0-rc.2 --dir "$D" --no-lock

# ─────────────────────────────────────────────────────────────────────────────
echo "workspace monorepo (apps/*/logic, one shared pin)"
# ─────────────────────────────────────────────────────────────────────────────
D=$(mkfixture workspace)
mkdir -p "$D/apps/one/logic/workflows/probes" "$D/apps/two/logic" \
         "$D/.github/actions/install-cargo-mero"
cat > "$D/Cargo.toml" <<'EOF'
[workspace]
members = ["apps/*/logic"]

[workspace.dependencies]
calimero-sdk            = { git = "https://github.com/calimero-network/core.git", tag = "0.11.0-rc.1" }
calimero-storage        = { git = "https://github.com/calimero-network/core.git", tag = "0.11.0-rc.1" }

[workspace.metadata.mero-apps]
min-runtime-version = "0.11.0-rc.1"
merod-image = "ghcr.io/calimero-network/merod:0.11.0-rc.1"
EOF
for a in one two; do
cat > "$D/apps/$a/logic/Cargo.toml" <<'EOF'
[package.metadata.calimero]
package = "com.calimero.x"
min-runtime-version = "0.11.0-rc.1"
EOF
done
echo 'image: ghcr.io/calimero-network/merod:0.11.0-rc.1' > "$D/apps/one/logic/workflows/e2e.yml"
echo 'image: ghcr.io/calimero-network/merod:0.11.0-rc.1' > "$D/apps/one/logic/workflows/probes/smoke.yml"
printf 'inputs:\n  version:\n    default: "0.11.0-rc.1"\n' > "$D/.github/actions/install-cargo-mero/action.yml"
commit "$D"

expect_exit 0 "rewrites the workspace" bash "$BUMP" --surface cargo --version 0.11.0-rc.2 --dir "$D" --no-lock
expect_file "$D/Cargo.toml" 'tag = "0.11.0-rc.2"' "  workspace tag moved"
expect_file "$D/Cargo.toml" 'merod-image = "ghcr.io/calimero-network/merod:0.11.0-rc.2"' "  merod-image moved"
expect_file "$D/apps/one/logic/Cargo.toml" 'min-runtime-version = "0.11.0-rc.2"' "  app one's floor moved"
expect_file "$D/apps/two/logic/Cargo.toml" 'min-runtime-version = "0.11.0-rc.2"' "  app two's floor moved"
expect_file "$D/apps/one/logic/workflows/e2e.yml" 'merod:0.11.0-rc.2' "  scenario image moved"
# The repo's own checker globs one level and never sees probes/; drift there is
# invisible until a probe runs against a node two releases old.
expect_file "$D/apps/one/logic/workflows/probes/smoke.yml" 'merod:0.11.0-rc.2' "  probes/ scenario moved too"
expect_file "$D/.github/actions/install-cargo-mero/action.yml" '"0.11.0-rc.2"' "  cargo-mero default moved"
expect_exit 4 "second run is a no-op" bash "$BUMP" --surface cargo --version 0.11.0-rc.2 --dir "$D" --no-lock

# An app whose floor trailed the tag is HEALED, not carried forward. This is the
# drift that started the rc.25 sweep: six repositories pinned one release with
# the floor still on the one before, each edited by hand by someone who moved
# the tag and forgot the floor.
printf '[package.metadata.calimero]\nmin-runtime-version = "0.9.9"\n' \
  > "$D/apps/two/logic/Cargo.toml"
expect_exit 0 "a drifted app is healed" \
  bash "$BUMP" --surface cargo --version 0.11.0-rc.3 --dir "$D" --no-lock
expect_file "$D/apps/two/logic/Cargo.toml" 'min-runtime-version = "0.11.0-rc.3"' "  drift healed"

# An app with no floor at all is a hard stop: check-app-metadata.sh rejects it,
# so opening the pull request would only spend a CI run to say so.
printf '[package.metadata.calimero]\npackage = "com.calimero.x"\n' \
  > "$D/apps/two/logic/Cargo.toml"
expect_exit 1 "an app with no floor stops the run" \
  bash "$BUMP" --surface cargo --version 0.11.0-rc.4 --dir "$D" --no-lock

# ─────────────────────────────────────────────────────────────────────────────
echo "pnpm catalog (versions live in pnpm-workspace.yaml)"
# ─────────────────────────────────────────────────────────────────────────────
D=$(mkfixture catalog); mkdir -p "$D/apps/one/app"
cat > "$D/pnpm-workspace.yaml" <<'EOF'
packages:
  - "apps/*/app"

catalog:
  "@calimero-network/mero-js": ^13.2.5
  "@calimero-network/mero-ui": ^1.5.1
EOF
cat > "$D/apps/one/app/package.json" <<'EOF'
{
  "name": "one",
  "dependencies": {
    "@calimero-network/mero-js": "catalog:",
    "@calimero-network/mero-icons": "0.0.6"
  }
}
EOF
touch "$D/pnpm-lock.yaml"
commit "$D"

expect_exit 0 "bumps through the catalog" \
  bash "$BUMP" --surface npm --pkg @calimero-network/mero-js=13.2.9 --dir "$D" --no-lock
expect_file "$D/pnpm-workspace.yaml" '"@calimero-network/mero-js": ^13.2.9' "  catalog entry moved, ^ kept"
expect_file "$D/apps/one/app/package.json" '"@calimero-network/mero-js": "catalog:"' "  package.json left alone"
expect_exit 4 "second run is a no-op" \
  bash "$BUMP" --surface npm --pkg @calimero-network/mero-js=13.2.9 --dir "$D" --no-lock

# The regression this guards: "catalog:" has no digits, so the numeric guard
# skipped it and the run exited 4 — a repository silently receiving no bumps
# while reporting success.
expect_exit 0 "a literal version alongside the catalog still moves" \
  bash "$BUMP" --surface npm --pkg @calimero-network/mero-icons=0.0.7 --dir "$D" --no-lock
expect_file "$D/apps/one/app/package.json" '"@calimero-network/mero-icons": "0.0.7"' "  literal dep moved"

expect_exit 4 "a major is skipped by default" \
  bash "$BUMP" --surface npm --pkg @calimero-network/mero-js=15.0.0 --dir "$D" --no-lock
expect_exit 0 "--allow-major crosses it" \
  bash "$BUMP" --surface npm --pkg @calimero-network/mero-js=15.0.0 --dir "$D" --no-lock --allow-major
expect_exit 3 "a package nobody declares is 'not applicable'" \
  bash "$BUMP" --surface npm --pkg @calimero-network/nothing=1.0.0 --dir "$D" --no-lock

# ─────────────────────────────────────────────────────────────────────────────
echo "catalog workspace: what a bump does NOT reach"
# ─────────────────────────────────────────────────────────────────────────────
#
# Three real shapes from calimero-network/apps, each one a way for a release to
# report success while an app sits it out.
D=$(mkfixture reach); mkdir -p "$D/apps/one/app" "$D/apps/two/app" "$D/apps/three"
cat > "$D/pnpm-workspace.yaml" <<'EOF'
packages:
  - "apps/*/app"

catalog:
  "@calimero-network/mero-ui": ^1.5.1
EOF
printf '{"name":"root"}\n' > "$D/package.json"
# On the catalog: moves for free.
printf '{"name":"one","dependencies":{"@calimero-network/mero-ui":"catalog:"}}\n' \
  > "$D/apps/one/app/package.json"
# A member that declares its own version for a CATALOGUED package, majors
# behind. The catalog edit does not reach it and the major guard skips it, so
# without a report this app silently never upgrades. mero-drive is this.
printf '{"name":"two","dependencies":{"@calimero-network/mero-ui":"^0.3.6"}}\n' \
  > "$D/apps/two/app/package.json"
# OUTSIDE the `apps/*/app` glob: a pre-migration leftover root manifest. pnpm
# never installs it. meropass, battleships and mero-drive all still carry one.
printf '{"name":"three","dependencies":{"@calimero-network/mero-ui":"^0.3.4"}}\n' \
  > "$D/apps/three/package.json"
touch "$D/pnpm-lock.yaml"
commit "$D"

U="$ROOT/npm-unclaimed.txt"
expect_exit 0 "bumps the catalog and the member that can move" \
  env UNCLAIMED_OUT="$U" bash "$BUMP" --surface npm \
      --pkg @calimero-network/mero-ui=1.5.2 --dir "$D" --no-lock

expect_file "$D/pnpm-workspace.yaml" '"@calimero-network/mero-ui": ^1.5.2' "  catalog moved"
expect_file "$D/apps/one/app/package.json" '"catalog:"' "  the catalog member is untouched"

# The whole point: the leftover outside the workspace is left exactly as it was,
# rather than staged as a change to a file no install reads.
expect_file "$D/apps/three/package.json" '"^0.3.4"' "  a manifest outside the workspace is NOT rewritten"
expect_file "$U" 'apps/three/package.json' "  ...and is reported as outside the workspace"
expect_file "$U" 'OUTSIDE THE WORKSPACE' "  ...under that heading"

# And the member that opted out of the catalog is named, both ways.
expect_file "$D/apps/two/app/package.json" '"^0.3.6"' "  a major behind is not force-bumped"
expect_file "$U" 'NOT REACHED BY THE CATALOG' "  ...reported as not reached by the catalog"
expect_file "$U" 'SKIPPED, MAJOR JUMP' "  ...and as a skipped major"

# The regression this last one guards: the major skip used to be mentioned ONLY
# when nothing at all moved. A run that moved the catalog reported success and
# said nothing about the app it had skipped.
expect_file "$U" 'apps/two/app/package.json' "  a skipped app is named even though the catalog DID move"
# ─────────────────────────────────────────────────────────────────────────────
echo "no surface at all"
# ─────────────────────────────────────────────────────────────────────────────
D=$(mkfixture bare); echo '{}' > "$D/package.json"; commit "$D"
expect_exit 3 "no contract anywhere" bash "$BUMP" --surface cargo --version 0.11.0-rc.2 --dir "$D" --no-lock

echo
echo "$PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
