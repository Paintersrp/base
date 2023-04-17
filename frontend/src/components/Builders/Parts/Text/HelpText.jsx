import React from "react";
import { makeStyles } from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  helpText: {
    color: theme.palette.text.secondary,
  },
}));

export default function HelpText({ children }) {
  const classes = useStyles();
  return (
    <Text mt={8} mb={4} style={{ color: "#626262", padding: 0 }}>
      {children}
    </Text>
  );
}
