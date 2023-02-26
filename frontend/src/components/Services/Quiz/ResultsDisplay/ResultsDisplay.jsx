import React from "react";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ServicesResultCarousel from "./ServicesResultCarousel";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { quizStyles } from "../styles";
import ServicesResult from "./ServicesResult";
import TablesDisplay from "../TablesDisplay/TablesDisplay";
import Benefits from "../../Benefits/Benefits";

const ResultsDisplay = ({
  services,
  setServices,
  setRecommendedServices,
  setUnrecommendedServices,
  recommendedServices,
  unrecommendedServices,
}) => {
  const classes = quizStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReset = () => {
    setServices(services);
    setRecommendedServices("");
    setUnrecommendedServices([]);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box className={`${classes.fadeIn}`}>
      <Grid container flex justifyContent="center">
        {isSmallScreen ? (
          <ServicesResultCarousel
            recommended={recommendedServices}
            others={unrecommendedServices}
          />
        ) : (
          <ServicesResult
            recommendedId={recommendedServices.id}
            others={services}
          />
        )}
      </Grid>
      <Grid container flex justifyContent="center">
        <StyledButton size="small" buttonText="Book a Service" />
      </Grid>
      <Grid container flex justifyContent="center">
        <StyledButton
          size="small"
          buttonText="Reset Quiz"
          onClick={handleReset}
        />
      </Grid>
      <TablesDisplay />
      <Benefits />
    </Box>
  );
};

export default ResultsDisplay;
