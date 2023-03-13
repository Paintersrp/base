import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import CardBase from "./CardBase";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { CondensedTopMedia } from "./CardStyles";
import BaseCarousel from "../../Elements/Base/BaseCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.light,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  pricingContainer: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.light,
    maxWidth: 1400,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Pricing({ serviceData }) {
  const classes = useStyles();
  const cardLayout = CondensedTopMedia();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      {isSmallScreen ? (
        <Grid container className={classes.pricingContainer}>
          <BaseCarousel title="Pricing Tiers">
            {serviceData.map((plan, index) => (
              <CardBase index={index} plan={plan} classes={cardLayout} />
            ))}
          </BaseCarousel>
        </Grid>
      ) : (
        <>
          <Grid container className={classes.pricingContainer}>
            {serviceData.map((plan, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                lg={6}
                xl={4}
                className={classes.cardContainer}
              >
                <CardBase index={index} plan={plan} classes={cardLayout} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
