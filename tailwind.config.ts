import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        pokedex: {
          red: "#e53935",
          yellow: "#ffd166",
          blue: "#168aad",
          green: "#57cc99",
          ink: "#12213a",
          cream: "#fff8e8"
        }
      },
      boxShadow: {
        card: "0 18px 60px rgba(18, 33, 58, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
