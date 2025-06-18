// tailwind.config.js
const { heroUi, colors: heroUiColors } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/navbar.js",
    // Add your own content paths if needed
  ],
  theme: {
    extend: {
      colors: {
        ...heroUiColors,
        'elevate-blue-200': '#A9CEF4',
        'elevate-blue-400': '#3C78D8',
        'elevate-blue-600': '#004BA8',
        'elevate-blue-off': '#7EA0B7',
        'elevate-gray-200': '#4A525A',
        'elevate-gray-600': '#24272B',
      }
    },
  },
  darkMode: "class",
  plugins: [heroUi()],
};
