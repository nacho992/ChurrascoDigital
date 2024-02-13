/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b00ff",
        "background-image-50": "#3a3478",
        "background-image-100": "#231e47",
        "background-50": "#E7E6F4",
        "background-100": "#D3D1EB",
        "background-200": "#A39FD6",
        "background-300": "#7770C2",
        "background-400": "#5048A8",
        "background-500": "#393377",
        "background-600": "#2E2960",
        "background-700": "#221F47",
        "background-800": "#16142E",
        "background-900": "#0C0B19",
        "background-950": "#05050B"
      }
    },
  },
  plugins: [],
}

