import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import timelineData from "../Timeline/timelineData";
import ServiceCard from "./ServiceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
}));

const Magazine = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h4"
        align="center"
        gutterBottom
      >
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {timelineData.map((service) => (
          <Grid key={service.title} item xs={12} sm={12} md={6} lg={4}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Magazine;
