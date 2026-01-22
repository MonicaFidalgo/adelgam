export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#f9faf1",
        "brand-secondary": "#bd9a68",
        "brand-gray": "#797978",
      },
      spacing: {
        200: "200px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
