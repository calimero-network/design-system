import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react/jsx-runtime', '@calimero-network/mero-icons'],
  noExternal: [
    '@tiptap/react',
    '@tiptap/starter-kit',
    '@tiptap/extension-text-style',
    '@tiptap/extension-color',
    '@tiptap/extension-text-align',
    '@tiptap/extension-underline',
    '@tiptap/extension-link',
  ],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    }
  }
});
