import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  external: ['react', 'recharts'],
  treeshake: true,
  clean: true,
})
