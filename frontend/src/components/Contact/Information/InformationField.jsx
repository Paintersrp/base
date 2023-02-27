import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "85%",
  },
}));

export default function InformationField({ text, data }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1">{text}</Typography>
      <Typography variant="subtitle1">{data}</Typography>
    </>
  );
}
