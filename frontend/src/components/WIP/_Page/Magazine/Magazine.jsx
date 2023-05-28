import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import servicesData from "../../../../../../../_Archived/Timeline/servicesData";
import ServiceCard from "../../../../../../../_Archived/Timeline/ServiceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
}));

const Magazine = ({ showStudies }) => {
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
        {servicesData.map((service) => (
          <Grid key={service.title} item xs={12} sm={12} md={6} lg={4}>
            <ServiceCard showStudies={showStudies} {...service} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Magazine;
