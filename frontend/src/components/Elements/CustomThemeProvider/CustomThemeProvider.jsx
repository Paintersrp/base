import React, { createContext, useState } from "react";

const defaultPalette = {
  common: {
    black: "#000",
    white: "#fff",
  },
  primary: {
    main: "#1976d2",
    light: "#63a4ff",
    dark: "#004ba0",
  },
  secondary: {
    main: "#f50057",
    light: "#ff4081",
    dark: "#c51162",
  },
  text: {
    primary: "#333",
    secondary: "#757575",
    disabled: "#bdbdbd",
  },
  background: {
    default: "#f5f5f5",
    paper: "#fff",
  },
  spacing: 8,
};

const defaultCustomClasses = {
  body: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "blue",
    fontSize: "4rem",
  },
};

const defaultTheme = {
  palette: defaultPalette,
  customClasses: defaultCustomClasses,
};

export const ThemeContext = createContext(defaultTheme);
export const CustomClassesContext = createContext(defaultCustomClasses);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const updateTheme = (newTheme) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <CustomClassesContext.Provider value={theme.customClasses}>
        {children}
      </CustomClassesContext.Provider>
    </ThemeContext.Provider>
  );
};
