import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#d62828",
        orange: "#f77f00",
        green: "#16a34a",
        yellow: "#fcbf49",
        gray: {
          lighter: "#F2F2F2",
          DEFAULT: "#E5E5E5",
          darker: "#C4C4C4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
