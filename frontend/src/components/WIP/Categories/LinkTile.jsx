import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  innerPaper: {
    minWidth: 200,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#1C1C1C",
    margin: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.02)",
      boxShadow: theme.shadows[10],
      backgroundColor: theme.palette.action.hover,
    },
  },
  icon: {
    fontSize: "3rem",
    marginBottom: 10,
    color: "#FDD017",
  },
  link: {
    textDecoration: "none",
  },
  tileContainer: {
    display: "flex",
    justifyContent: "center",
  },
  tileText: {
    fontSize: "0.9rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    color: "white",
  },
}));

export default function LinkTile({ category }) {
  const classes = useStyles();

  return (
    <Link to={category.link} className={classes.link}>
      <div className={classes.tileContainer}>
        <Paper className={classes.innerPaper} elevation={3}>
          <category.icon className={classes.icon} />
          <Typography className={classes.tileText}>{category.name}</Typography>
        </Paper>
      </div>
    </Link>
  );
}
