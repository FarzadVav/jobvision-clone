import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2.65rem",
        xl: "3.25rem",
      },
    },
    extend: {
      colors: {
        white: "hsl(var(--white))",
        black: "hsl(var(--black))",
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
        primary: "hsl(var(--primary))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;
