import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        sm: "620px",
        xl: "1196px",
        "2xl": "1196px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        DEFAULT: "#6255C9",
        light: "#9497E5",
        dark: "#4B4291",
      },
      secondary: {
        DEFAULT: "#64C4FF",
        light: "#B8E2FF",
        dark: "#0079CC",
      },
      text: {
        primary: "#1E262B",
        secondary: "#62676B",
        light: "#A5A8AA",
      },
      border: {
        primary: "#C7C7C9",
        light: "#E9E9EA",
      },

      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
  },
  plugins: [],
};
export default config;
