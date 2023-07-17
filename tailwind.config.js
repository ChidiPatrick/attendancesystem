/** @type {import('tailwindcss').Config} */
// import { withMT } from "@material-tailwind/react/utils/withMT";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lp-primary": "#1946A6",
        "lp-secondary": "#F78F1E",
        "lp-secondary-dark": "#b15e05e0",
        "lp-gradient-start": "#1946A6",
        "lp-gradient-end": "#6B19A600",
        "lp-font-color": "#333333",
        "lp-footer-bg": "#263238",
        "signup-gray": "#79747E",
        "signup-lc": "#FEF7FF",
        fbc: "#FFFDFA",
      },
    },
  },
  plugins: [],
};
