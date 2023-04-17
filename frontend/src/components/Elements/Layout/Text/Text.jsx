import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import alignSwitch from "./propSwitch";

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

function Text({
  t: type = "body1",
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  s: fontSize,
  a: align,
  children,
  className,
  style,
}) {
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
    <Component
      className={`${classes[type]} ${className}`}
      style={{
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        fontSize: fontSize,
        textAlign: alignSwitch(align),
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export default Text;
