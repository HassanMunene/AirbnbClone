/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "airbnb-gradient": "linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
      },
      colors: {
        "airbnb-theme-color": "#FF385C",
        "airbnb-light-black": "#222222",
        "airbnb-light-gray": "#717171",
      },
      gridTemplateRows: {
        "new-listing": "10vh 80vh 10vh",
      },
    },
  },
  plugins: [],
}