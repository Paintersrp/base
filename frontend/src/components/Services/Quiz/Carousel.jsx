import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import { servicesData } from "./servicesData";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(3),
  },
  item: {
    margin: theme.spacing(3),
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

function ServiceItem({ service, active }) {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      style={{
        height: 400,
        width: active ? 300 : 300,
        opacity: active ? 1 : hovered ? 0.7 : 0.3,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {active && <Typography>Selected</Typography>}
      <Typography variant="h5">{service.title}</Typography>
      <Typography variant="body1">{service.description}</Typography>
      <Typography variant="h6">Price: {service.price}</Typography>
      <ul>
        {service.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <img
        src={service.image}
        alt={service.title}
        style={{ maxWidth: "100%" }}
      />
    </Paper>
  );
}

const Carousel = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(
      activeIndex === 0 ? servicesData.length - 1 : activeIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(
      activeIndex === servicesData.length - 1 ? 0 : activeIndex + 1
    );
  };

  return (
    <Grid container className={classes.root} justify="center">
      {servicesData.map((service, index) => (
        <Grid
          item
          className={classes.item}
          style={{
            transform:
              index === activeIndex - 1
                ? "translateX(0%) scale(0.9)"
                : index === activeIndex
                ? "translateX(0%) scale(0.95)"
                : index === activeIndex + 1
                ? "translateX(0%) scale(0.9)"
                : "translateX(0%) scale(0.9)",
            transition: "all 0.3s ease",
          }}
          onClick={handlePrev}
        >
          <ServiceItem
            key={service.id}
            service={service}
            active={index === activeIndex}
          />
        </Grid>
      ))}
      <Grid container justifyContent="center">
        <Grid item className={classes.item}>
          <Button onClick={handlePrev}>Prev</Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button onClick={handleNext}>Next</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Carousel;
