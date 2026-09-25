---
"@calimero-network/mero-ui": patch
---

RichTextEditor: stop registering `link` and `underline` twice

Tiptap v3's `StarterKit` already bundles `Link` and `Underline`; adding them
again made every editor mount throw
`RangeError: Adding different instances of a keyed plugin (plugin$)` after
`[tiptap warn]: Duplicate extension names found: ['link','underline']`,
surfacing in consumers as a bare `Minified React error #520`. Both are now
configured through `StarterKit` (#24), which shipped in no release until this
one.
