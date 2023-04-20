import React from "react";
import { makeStyles } from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  helpText: {
    color: theme.palette.text.secondary,
  },
}));

export default function HelpText({
  children,
  a = "l",
  mt = 8,
  mb = 4,
  mr = 0,
  ml = 0,
}) {
  const classes = useStyles();
  return (
    <Text
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      a={a}
      style={{ color: "#626262", padding: 0 }}
    >
      {children}
    </Text>
  );
}
