/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleAttributePerLine: true,
  tabWidth: 4,
  semi: true,
  useTabs: true,
  printWidth: 80,
};

module.exports = config;
