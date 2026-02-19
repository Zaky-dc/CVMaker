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
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#818cf8",   // indigo-400
          DEFAULT: "#6366f1", // indigo-500
          dark: "#4338ca",    // indigo-700
        },
        secondary: {
          light: "#c084fc",   // purple-400
          DEFAULT: "#a855f7", // purple-500
          dark: "#7e22ce",    // purple-800
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a",
        },
        background: {
          light: "#f1f5f9",
          dark: "#0f172a",
        },
        nav: {
          DEFAULT: "#1e1b4b",  // deep indigo nav rail
          dark: "#0f0e1a",
        },
      },
      boxShadow: {
        "material-1": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.14)",
        "material-2": "0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.14)",
        "material-3": "0 10px 30px rgba(0,0,0,0.14), 0 6px 10px rgba(0,0,0,0.10)",
        "glass": "0 8px 32px rgba(31,41,55,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
        "preview": "0 25px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15)",
      },
      scale: {
        "25": ".25",
        "50": ".50",
        "60": ".60",
        "70": ".70",
        "75": ".75",
        "80": ".80",
        "85": ".85",
        "90": ".90",
        "95": ".95",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
}
