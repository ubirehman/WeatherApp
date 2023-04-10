
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,tsx,jsx}"],
  theme: {
    extend: {
      colors:
      {
       "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
    },
    fontFamily:{
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true
    },
    screens:{
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

