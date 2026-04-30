import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper:    "#F4EDDC",
        paper2:   "#EDE4CC",
        ink:      "#1C2A48",
        ink2:     "#2C3958",
        ink3:     "#5A6680",
        ink4:     "#9AA0B0",
        sepia:    "#9E3D24",
        moss:     "#4B6A2C",
        moss2:    "#E4EAD2",
        teal:     "#3F8A72",
        teal2:    "#DEEAE3",
        amber1:   "#A47A1B",
        amber2:   "#F5EBC8",
        rule:     "#C9BFA4"
      },
      fontFamily: {
        serif: ["'EB Garamond'", "ui-serif", "Georgia", "serif"],
        sans:  ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:  ["'JetBrains Mono'", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        spec: "0.14em"
      }
    }
  },
  plugins: []
};

export default config;
