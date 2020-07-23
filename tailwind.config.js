module.exports = {
  theme: {
    extend: {
      spacing: {
        "96": "24rem",
        "128": "32rem",
      },
      colors: {
        gray: {
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
        },
      },
      fontFamily: {
        ascent: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
      },
      letterSpacing: {
        widerest: "0.125em",
      },
      screens: {
        xxl: "2560px",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
        "-30": "-30",
        "-40": "-40",
        "-50": "-50",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    margin: ["responsive", "last"],
    textDecoration: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
  purge: false,
}
