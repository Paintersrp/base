import React, { useContext } from "react";
import { ThemeContext } from "./CustomThemeProvider";

const createStyles = (theme) => ({
  root: {
    display: "flex",
    paddingBottom: `${theme.spacing}px`,
    fontSize: "50px",
    color: theme.palette.primary.main,
  },
});

const TestComponent = () => {
  const { theme } = useContext(ThemeContext);
  const classes = createStyles(theme);

  return (
    <>
      {classes && (
        <div>
          <p style={classes.root}>custom class test</p>
        </div>
      )}
    </>
  );
};

export default TestComponent;
