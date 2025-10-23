/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
          "custom-down": "0 8px 15px rgba(0, 0, 0, 0.3)", // bóng đổ xuống dưới
          "custom-down-blue": "0 10px 20px rgba(0, 0, 255, 0.4)", // bóng xanh đổ xuống dưới
      },
    },
  },
  plugins: [],
};
