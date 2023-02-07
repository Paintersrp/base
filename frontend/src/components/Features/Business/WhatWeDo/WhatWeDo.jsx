import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: "#333",
    color: "white",
    padding: "2rem",
  },
  icon: {
    fontSize: "4rem",
    color: "white",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#f50057",
      cursor: "pointer",
    },
  },
  iconContainer: {
    textAlign: "center",
    "&:hover": {
      background: "#444",
    },
  },
  textContainer: {
    textAlign: "center",
    padding: "1rem",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
});

const WhatWeDo = ({ data }) => {
  const classes = useStyles();

  return (
    <Box my={4}>
      <Grid container className={classes.root}>
        {data.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={4}
            className={classes.iconContainer}
          >
            <Link to={item.link}>
              <item.icon className={classes.icon} onClick={item.onClick} />
            </Link>
            <Box component="div" className={classes.textContainer}>
              <Typography variant="h5" className={classes.title}>
                {item.title}
              </Typography>
              <Typography variant="body1" component="p">
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default WhatWeDo;
