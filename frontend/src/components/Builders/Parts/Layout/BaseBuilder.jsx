import React from "react";
import { makeStyles, Paper, useTheme } from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  formContainer: {
    padding: theme.spacing(3),
  },
}));

const BaseBuilder = ({
  children,
  header,
  headerType = "h1",
  headerAlign = "c",
  headerGutter = false,
  gutterSize = 3,
  pad = 3,
  mb = 4,
  style,
  className,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const paddingStyles = {
    padding: theme.spacing(pad),
    marginBottom: theme.spacing(mb),
  };
  const mergedStyles = { ...paddingStyles, ...style };

  return (
    <div
      className={`${classes.root} ${className ? className : null}`}
      style={mergedStyles}
    >
      <Paper className={classes.formContainer} elevation={3}>
        {header && (
          <Text
            t={headerType}
            a={headerAlign}
            style={{
              marginBottom: headerGutter ? theme.spacing(gutterSize) : 0,
            }}
          >
            {header}
          </Text>
        )}
        {children}
      </Paper>
    </div>
  );
};

export default BaseBuilder;
