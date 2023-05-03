var path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require(path.join(__dirname, '../../../dist/packages/tompke/tailwind')),
  ],
  content: [path.join(__dirname, './src/**/*.ts')],
  plugins: [require(path.join(__dirname, '../../../dist/packages/tompke/tailwind/plugins/custom-text-classes'))],
};
