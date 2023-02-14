import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: theme.spacing(2),
  },
  stepNumber: {
    fontWeight: 700,
    fontSize: "2rem",
    color: "#7b7b7b",
    marginBottom: theme.spacing(2),
  },
  stepTitle: {
    fontWeight: 600,
    fontSize: "2.5rem",
    color: "#121212",
    marginBottom: theme.spacing(2),
  },
  stepDescription: {
    fontWeight: 500,
    fontSize: "1.2rem",
    color: "#7b7b7b",
    lineHeight: "1.5",
  },
}));

const servicesData = [
  {
    id: 1,
    title: "Step 1: Introduction",
    image: "https://source.unsplash.com/400x400/?service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    title: "Step 2: Consultation",
    image: "https://source.unsplash.com/250x250/?service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    title: "Step 3: Design",
    image: "https://source.unsplash.com/500x500/?service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    title: "Step 4: Implementation",
    image: "https://source.unsplash.com/600x600/?service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 5,
    title: "Step 5: Testing and Delivery",
    image: "https://source.unsplash.com/600x400/?service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const StorytellingLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Our Services
      </Typography>
      <div>
        <Grid container spacing={3}>
          {servicesData.map((service) => (
            <Grid item xs={12} md={6} key={service.id}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.stepNumber}
                  variant="h1"
                  component="h2"
                >
                  {service.id}
                </Typography>
                <img
                  className={classes.image}
                  src={service.image}
                  alt={service.title}
                />
                <Typography
                  className={classes.stepTitle}
                  variant="h3"
                  component="h3"
                >
                  {service.title}
                </Typography>
                <Typography className={classes.stepDescription} variant="body1">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default StorytellingLayout;
