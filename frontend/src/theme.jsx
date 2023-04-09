import { createTheme } from "@material-ui/core/styles";

//primary #6b7c9b
//secondary #644f45

//cyan / brownish
//#01838F
//#8f0d01

export const commonColors = {
  white: "#ffffff",
  black: "#000000",
  gray: "#bdbdbd",
  red: "#f44336",
  amber: "#ffc107",
  blue: "#3f51b5",
  green: "#4caf50",
  yellow: "#ffeb3b",
  orange: "#ff9800",
  purple: "#9c27b0",
};

const palettes = {
  primary: {
    main: "#2e3b55",
    light: "#6b7c9b",
    dark: "#00152e",
    contrastText: "#fff",
    gold: "#ff8c00",
  },
  secondary: {
    main: "#ff8c00",
    light: "#ffd04d",
    dark: "#c75e00",
    contrastText: "#fff",
  },
  success: {
    light: "#81c784",
    main: commonColors.green,
    dark: "#388e3c",
  },
  warning: {
    light: "#ffd54f",
    main: commonColors.yellow,
    dark: "#f57f17",
  },
  error: {
    light: "#e57373",
    main: commonColors.red,
    dark: "#d32f2f",
  },
  info: {
    light: "#64b5f6",
    main: commonColors.blue,
    dark: "#1976d2",
  },
  text: {
    dark: "#222",
    light: "#fff",
    primary: "rgba(0, 0, 0, 1)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(121, 134, 203 , 0.75)",
    hoverLight: "rgba(121, 134, 203 , 0.10)",
    hoverOpacity: 0.08,
    selected: "rgba(0, 0, 0, 0.14)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
  background: {
    default: "#f5f5f5",
    paper: "#f5f5f5",
    light: "#f5f5f5",
  },
};

const fontSizes = {
  h1: "2.25rem",
  h2: "2rem",
  h3: "1.75rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1rem",
  body1: "1rem",
  body2: "0.875rem",
  caption: "0.75rem",
  one: ".75rem",
  two: "1rem",
  three: "1.25rem",
  four: "1.5rem",
  five: "1.75rem",
  six: "2rem",
  seven: "2.25rem",
};

const baseTheme = createTheme({
  palette: {
    common: commonColors,
    primary: palettes.primary,
    secondary: palettes.secondary,
    success: palettes.success,
    warning: palettes.warning,
    error: palettes.error,
    info: palettes.info,
    background: palettes.background,
    text: palettes.text,
    action: palettes.action,
  },
  fontSize: fontSizes,
  typography: {
    fontFamily: ["Roboto", "Poppins"].join(","),
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
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
      lineHeight: 1.334,
      letterSpacing: "-0.00833em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
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
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
      containedPrimary: {
        backgroundColor: palettes.primary.main,
        color: commonColors.white,
        "&:hover": {
          backgroundColor: palettes.primary.dark,
        },
      },
      containedSecondary: {
        backgroundColor: palettes.secondary.main,
        color: commonColors.white,
        "&:hover": {
          backgroundColor: palettes.secondary.dark,
        },
      },
      outlinedPrimary: {
        border: `1px solid ${palettes.primary.main}`,
        color: palettes.primary.main,
        "&:hover": {
          border: `1px solid ${palettes.primary.dark}`,
          backgroundColor: palettes.primary.main,
          color: commonColors.white,
        },
      },
      outlinedSecondary: {
        border: `1px solid ${palettes.secondary.main}`,
        color: palettes.secondary.main,
        "&:hover": {
          border: `1px solid ${palettes.secondary.dark}`,
          backgroundColor: palettes.secondary.main,
          color: commonColors.white,
        },
      },
      textPrimary: {
        color: palettes.primary.main,
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      },
      textSecondary: {
        color: palettes.secondary.main,
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      },
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

export default baseTheme;
