import React from "react";
import {
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  carousel: {
    margin: "0 auto",
    maxWidth: 1200,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: "0 16px",
    },
  },
}));

const BaseCarousel = ({ children, title, currentIndex }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    autoPlay: false,
    animation: "fade",
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
        marginRight: 10,
        marginLeft: 10,
      },
    },
    swipe: isSmallScreen,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    index: currentIndex,
  };

  return (
    <Grid container flex justifyContent="center" style={{ maxWidth: 1200 }}>
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h2"
          gutterBottom
          style={{ color: "black" }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid container flex justifyContent="center">
        <Carousel className={classes.carousel} {...settings}>
          {children}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default BaseCarousel;
