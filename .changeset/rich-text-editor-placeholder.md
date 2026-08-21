---
"@calimero-network/mero-ui": patch
---

RichTextEditor: render the `placeholder` prop

The prop was declared and destructured but never used — the Tiptap
`Placeholder` extension was never registered, so no `data-placeholder`
attribute was emitted and the existing
`p.is-editor-empty:first-child::before` rule had nothing to read. The
editor accepted a placeholder and silently showed nothing, which pushed
consumers into drawing their own overlays.

Registers the extension and reads the prop through a ref, so changing the
placeholder updates it in place instead of tearing down the editor and
losing selection and undo history. An empty transaction is dispatched when
the prop changes, because placeholder decorations recompute on transactions
rather than on React renders.
