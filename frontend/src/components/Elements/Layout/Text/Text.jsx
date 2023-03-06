import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  h1: theme.typography.h1,
  h2: theme.typography.h2,
  h3: theme.typography.h3,
  h4: theme.typography.h4,
  h5: theme.typography.h5,
  h6: theme.typography.h6,
  subtitle1: theme.typography.subtitle1,
  subtitle2: theme.typography.subtitle2,
  body1: theme.typography.body1,
  body2: theme.typography.body2,
}));

function Text({ type, children, ...rest }) {
  const classes = useStyles();

  let Component = "p";

  if (type === "h1") Component = "h1";
  if (type === "h2") Component = "h2";
  if (type === "h3") Component = "h3";
  if (type === "h4") Component = "h4";
  if (type === "h5") Component = "h5";
  if (type === "h6") Component = "h6";
  if (type === "subtitle1") Component = "p";
  if (type === "subtitle2") Component = "p";
  if (type === "body1") Component = "p";
  if (type === "body2") Component = "p";

  return (
    <Component className={classes[type]} {...rest}>
      {children}
    </Component>
  );
}

export default Text;
