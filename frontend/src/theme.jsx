import { createTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    black: "black",
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
      contrastText: "#fff",
      gold: "#ffd700",
    },
    secondary: {
      light: "#ff4081",
      main: "#ea0727",
      dark: "#ea0727",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#242424",
      paper: "#fff",
      light: "#fff",
    },
    text: {
      dark: "black",
      light: "#fff",
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(121, 134, 203 , 0.75)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.167,
      letterSpacing: "0.02em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.9rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "0.95rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.9rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "0.95rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.85rem",
    },
    button: {
      fontWeight: 600,
      fontSize: "0.9rem",
      textTransform: "uppercase",
    },
    caption: {
      fontWeight: 700,
      fontSize: "0.85rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.8rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 650,
      lg: 900,
      xl: 1280,
      xxl: 1920,
    },
  },
});

export default theme;
