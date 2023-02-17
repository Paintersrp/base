import React from "react";
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

const ServicesResult = ({ recommended, others }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    autoPlay: false,
    animation: "slide",
    interval: 5000,
    indicators: false,
    navButtonsAlwaysInvisible: isSmallScreen,
    navButtonsAlwaysVisible: !isSmallScreen,
    navButtonsProps: {
      style: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        height: 40,
        width: 40,
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
    // responsive: [
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 960,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 1280,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    // ],
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
            <SelectedService
              key={index}
              service={service}
              className={index > 2 ? classes.opaque : null}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default ServicesResult;

//   return (
//     <Grid container flex justifyContent="center" style={{ maxWidth: 1200 }}>
//       <Grid item xs={12}>
//         <Typography align="center" variant="h2" gutterBottom>
//           Recommended Services
//         </Typography>
//       </Grid>
//       <Grid container flex justifyContent="center">
//         <Grid
//           item
//           xs={12}
//           md={4}
//           lg={4}
//           style={{
//             order: isSmallScreen ? 0 : 1,
//           }}
//         >
//           <SelectedService key={1} service={recommended} highlighted />
//         </Grid>
//         {others.map((service, index) => (
//           <Grid
//             item
//             xs={12}
//             md={4}
//             lg={4}
//             style={{ order: index === 0 ? 0 : 2 }}
//           >
//             <SelectedService key={1} service={service} />
//           </Grid>
//         ))}
//       </Grid>
//     </Grid>
//   );
// };

// export default ServicesResult;
