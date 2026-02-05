import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Busca en tu carpeta app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Busca en tu carpeta components
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",        // Por si acaso
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004B85",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;