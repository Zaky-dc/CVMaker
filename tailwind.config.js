/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#42a5f5",
          DEFAULT: "#2196f3",
          dark: "#1565c0",
        },
        secondary: {
          light: "#ba68c8",
          DEFAULT: "#9c27b0",
          dark: "#7b1fa2",
        },
        surface: {
            light: "#ffffff",
            dark: "#121212",
        },
        background: {
            light: "#f5f5f5",
            dark: "#121212", 
        }
      },
      boxShadow: {
        "material-1": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "material-2": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        "material-3": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
      scale: {
        "25": ".25",
        "50": ".5",
        "75": ".75",
       }
    },
  },
  plugins: [],
}
