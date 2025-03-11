import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['iife'],
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
  outExtension: () => ({ js: '.js' }),
  banner: () => {
    return {
      js: '#!/usr/bin/env node',
    };
  },
});
