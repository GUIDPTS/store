import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierPlugin from "eslint-plugin-prettier";

export default withNuxt().override("nuxt/typescript/rules", {
  plugins: {
    prettier: prettierPlugin,
  },

  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-console": "warn",
    "no-debugger": "error",
    "no-empty": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
});
