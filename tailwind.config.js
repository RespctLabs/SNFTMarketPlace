module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        OurBlack: "#131312",
        OurGrey: "rgba(0, 0, 0, 0.1)",
        OurBlue: "#2BB2CC",
        OurPurple: "#7A5BB1",
        OurSecondGrey: "#424242",
      },
      dropShadow: {
        white: ["0 35px 35px rgba(0, 0, 0, 0.55)"],
      },
      backgroundImage: {
        respct: "url('/svg/respct.svg')",
        covers: "url('/svg/cover.svg')",
      },
    },
  },
  plugins: [],
};
