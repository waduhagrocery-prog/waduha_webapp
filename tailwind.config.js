/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Premium grocery palette inspired by Waduha brand
        cream: {
          50: "#FDFBF7",
          100: "#F8F5EE",
          200: "#EDE8DD",
        },
        coral: {
          400: "#FF8A5C",
          500: "#FF6B35",
          600: "#F05A2A",
          700: "#D94A1F",
        },
        leaf: {
          400: "#34C759",
          500: "#00A651",
          600: "#008C44",
          700: "#006837",
        },
        ink: {
          900: "#0F0F10",
          800: "#1A1A1C",
          700: "#2A2A2D",
          500: "#6B6B70",
          400: "#9A9A9F",
          200: "#E5E5E7",
          100: "#F2F2F4",
        },
        sun: "#FFB800",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0,0,0,0.06)",
        card: "0 8px 30px -8px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
