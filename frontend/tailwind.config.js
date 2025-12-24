// tailwind.config.js
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      container: {
        center: true, // this will auto-center your content
        padding: "1rem", // optional: adds padding on left/right
        screens: {
          xl: "1280px",
          "2xl": "1536px",
          "3xl": "1920px", // ✅ Add custom screen size
        },
      },
      extend: {},
    },
    plugins: [],
  };
  