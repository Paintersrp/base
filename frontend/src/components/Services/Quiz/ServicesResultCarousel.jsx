import React, { useState } from "react";
import {
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import SelectedService from "./SelectedService";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  carousel: {
    margin: "0 auto",
    maxWidth: 1200,
    [theme.breakpoints.down("sm")]: {
      margin: "0 16px",
    },
  },
  opaque: {
    opacity: 0.7,
  },
}));

const ServicesResultCarousel = ({ recommended, others }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    autoPlay: false,
    animation: "slide",
    interval: 5000,
    indicators: false,
    navButtonsAlwaysInvisible: false,
    navButtonsAlwaysVisible: true,
    navButtonsProps: {
      style: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(2),
        height: 20,
        width: 20,
        marginRight: 0,
        marginLeft: 0,
      },
    },
    navButtonsWrapperProps: {
      style: {
        bottom: isSmallScreen ? "8px" : "auto",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    swipe: isSmallScreen,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
  };

  return (
    <Grid container flex justifyContent="center" style={{ maxWidth: 1200 }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h2" gutterBottom>
          Recommended Services
        </Typography>
      </Grid>
      <Grid container flex justifyContent="center">
        <Carousel className={classes.carousel} {...settings}>
          {[recommended, ...others].map((service, index) => (
            <SelectedService key={index} service={service} active={true} />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default ServicesResultCarousel;
