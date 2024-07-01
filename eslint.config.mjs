import { defineConfig, globals } from '@aimerfan/eslint-config'

export default defineConfig({
  overrides: [
    {
      files: [globals.GLOB_TS],
      rules: { 'ts/no-explicit-any': 'off' },
    },
    {
      files: [globals.GLOB_VUE],
      rules: { 'no-unused-vars': 'off' },
    },
    {
      files: ['**/svg/*.vue'],
      rules: { '@stylistic/max-len': 'off' },
    },
  ],
})
