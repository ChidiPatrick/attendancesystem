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
        "user-profile": "#FFFDFA",
        "profile-white": "#FBFCFE",
        "profile-design-primary1": "#35A623",
        "profile-design-primary2": "#235FA6",
        "profile-design-middle": "#2387A6",
        "late-color-start": "#F78F1E",
        "late-color-middle": "#1EF7C3",
        "late-color-end": "#8AF71E",
        "user-pc": "#4A4A4A",
        "score-pc-start": "#1ef7c3",
        "score-pc-end": "#F78F1E00",
        "absent-pc-start": "#F71E1E",
        "absent-pc-middle": "#F7C71E",
        "absent-pc-end": "#f78f1e00",
        "early-color": "#35A623",
        "late-color": "#A68923",
        "absent-color": "#A63323",
        "my-grey": "#333",
      },
      backgroundColor: {
        grey: "#EEF0F4",
        myshade: "rgba(0,0,0,0.2)",
        mywhite: "rgba(255,255,255,0.3)",
      },
    },
  },

  plugins: [],
};
