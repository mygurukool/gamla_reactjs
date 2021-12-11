import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    white: "#fff",
    black: "#000",
    background: {
      light: "#26294D",
      main: "#18182F",
      primary: "#1E1F3A",
      dark: "#212121",
      // paper: "#3B3B3B",
    },
    divider: {
      main: '#303030'
    },
    text: {
      primary: "#e6e6e6",
      secondary: "#d1d1d1",
    },
    gray: {
      100: "#f9f9f9",
      200: "#F7F7F7",
      300: "#f4f4f4",
      400: "#F3F3F3",
      500: "#f1f1f1", // border alt color
      600: "#EdEdEd",
      700: "#E6E6E6", // border color
      800: "#C2C3CC",
      900: "#bdbdbd",
      1000: "#ababab",
      1200: "#919191",
    },
    textField: {
      main: "#E7EBFD",
    },
    // primary: {
    //   main: "#1f5f61",
    // },
    primary: {
      main: "#3FA7FF",
      light: "#fff7e8",
    },
    secondary: {
      main: "#FF865E",
      light: "#fdeaeb",
    },
    neutral: {
      main: '#FEE440',
      contrastText: '#000',
    },
    success: {
      main: "#09910d",
      light: "#09910d",
    },
    error: {
      main: "#b72136",
      light: "#ff484230",
    },
    warning: {
      main: "#b78103",
      light: "#fff7cd",
    },
    fontSizes: {
      xs: 11,
      sm: 13,
      base: 15,
      semibase: 17,
      md: 19,
      lg: 21,
      xl: 24,
      xxl: 30,
      "2xl": 30,
      "3xl": 36,
      "4xl": 42,
      "5xl": 48,
      "6xl": 54,
      "7xl": 60,
    },
    fontWeights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      bolder: 900,
    },
    radius: {
      base: "8px",
      small: "3px",
      medium: "12px",
      big: "20px",
      bigger: "50px",
    },
    // blue: {
    //   main: blue[100],
    // },

    // green: {
    //   main: green,
    // },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    caption: {
      fontWeight: 500,

    }
  },
});

theme = createTheme(theme, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.palette.radius.big
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: theme.palette.background.main,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.palette.radius.medium,
        },
      },
    },
  },
});

export default theme;
