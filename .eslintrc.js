module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["plugin:prettier/recommended", "plugin:react/recommended"],
  plugins: ["@typescript-eslint", "html"],
  rules: {
    "react/prop-types": 1,
    quotes: [2, "double"],
  },
};
