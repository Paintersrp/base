import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ComparisonTable from "./ComparisonTable";
import { SlideIntoViewPort } from "../../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";

const TablesDisplay = ({}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <SlideIntoViewPort
        animationDuration={1.75}
        onScreenPercentage={0}
        from={!isSmallScreen ? "left" : "below"}
      >
        <Grid
          container
          flex
          justifyContent="center"
          style={{
            maxWidth: isSmallScreen ? 500 : null,
            width: isSmallScreen ? "100%" : 1400,
            marginTop: theme.spacing(4),
          }}
        >
          <ComparisonTable type="service" />
        </Grid>
      </SlideIntoViewPort>
      <SlideIntoViewPort
        animationDuration={1.75}
        onScreenPercentage={0}
        from={!isSmallScreen ? "right" : "below"}
      >
        <Grid
          container
          flex
          justifyContent="center"
          style={{
            maxWidth: isSmallScreen ? 500 : null,
            width: isSmallScreen ? "100%" : 1400,
            marginTop: theme.spacing(4),
          }}
        >
          <ComparisonTable type="competition" heading="How We Stack Up" />
        </Grid>
      </SlideIntoViewPort>
    </>
  );
};

export default TablesDisplay;
