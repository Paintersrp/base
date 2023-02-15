import React from "react";
import { Typography, Grid, useTheme, useMediaQuery } from "@material-ui/core";
import SelectedService from "./SelectedService";

const ServicesResult = ({ recommended, others }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container flex justifyContent="center" style={{ maxWidth: 1200 }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h2" gutterBottom>
          Recommended Services
        </Typography>
      </Grid>
      <Grid container flex justifyContent="center">
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{
            order: isSmallScreen ? 0 : 1,
          }}
        >
          <SelectedService key={1} service={recommended} highlighted />
        </Grid>
        {others.map((service, index) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={{ order: index === 0 ? 0 : 2 }}
          >
            <SelectedService key={1} service={service} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ServicesResult;
