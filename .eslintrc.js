/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  globals: {},
  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "airbnb-base",
    "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "comma-dangle": "off",
    "vue/multi-word-component-names": ["error", { ignores: ["index"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "off",
    // for import ./public
    "import/no-absolute-path": "off",
    "import/no-unresolved": "off",
    // use @typescript-eslint/no-unused-vars to check.
    "no-unused-vars": "off",
    // use @typescript-eslint/no-shadow to check.
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  }
}
