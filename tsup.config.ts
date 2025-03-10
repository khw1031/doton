import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
  banner: () => {
    return {
      js: '#!/usr/bin/env node',
    };
  },
});
