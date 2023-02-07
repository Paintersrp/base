import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: "white",
    textAlign: "left !important",
    borderBottom: "1px solid white !important",
    marginBottom: "10px !important",
    paddingBottom: "2px !important",
  },
  body: {
    color: "white",
    marginTop: 15,
    marginBottom: 30,
  },
}));

export default function ContentBlock({ title, body }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.body}>
        {body}
      </Typography>
    </>
  );
}
