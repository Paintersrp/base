import React from "react";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ServicesResultCarousel from "./ServicesResultCarousel";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { quizStyles } from "../styles";
import ServicesResult from "./ServicesResult";
import TablesDisplay from "../TablesDisplay/TablesDisplay";
import Benefits from "../../Benefits/Benefits";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";

const ResultsDisplay = ({
  services,
  setServices,
  setRecommendedServices,
  setUnrecommendedServices,
  recommendedServices,
  unrecommendedServices,
  benefitsData,
  benefitsBlock,
  setBenefitsBlock,
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
    <Box className={`${classes.fadeIn}`} style={{ width: "100%" }}>
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
        <StyledButton
          size="small"
          startIcon={<StyleSharpIcon />}
          buttonText="Book a Service"
          minWidth={160}
        />
      </Grid>
      <Grid container flex justifyContent="center">
        <StyledButton
          size="small"
          buttonText="Reset Quiz"
          onClick={handleReset}
          startIcon={<RestartAltSharpIcon />}
          minWidth={160}
        />
      </Grid>
      <TablesDisplay />
      <Benefits
        benefits={benefitsData}
        block={benefitsBlock}
        setBlock={setBenefitsBlock}
      />
    </Box>
  );
};

export default ResultsDisplay;
