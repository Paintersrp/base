import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Slide, useMediaQuery } from "@material-ui/core";
import CardBase from "./CardBase";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { CondensedTopMedia } from "./CardStyles";
import BaseCarousel from "../../Elements/Base/BaseCarousel";
import Carousel from "../../Elements/Base/Carousel/Carousel";

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

const images = [
  {
    id: 1,
    src: "https://via.placeholder.com/600x400/1abc9c/ffffff",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://via.placeholder.com/600x400/3498db/ffffff",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://via.placeholder.com/600x400/e74c3c/ffffff",
    alt: "Image 3",
  },
];

export default function Pricing() {
  const classes = useStyles();
  const cardLayout = CondensedTopMedia();
  const [plans, setPlans] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axiosInstance
      .get("/pricingplan/")
      .then((response) => {
        setPlans(response.data);
        console.log(plans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      {isSmallScreen ? (
        <Grid container className={classes.pricingContainer}>
          <BaseCarousel title="Pricing Tiers">
            {plans.map((plan, index) => (
              <CardBase index={index} plan={plan} classes={cardLayout} />
            ))}
          </BaseCarousel>
        </Grid>
      ) : (
        <>
          <Grid container className={classes.pricingContainer}>
            {plans.map((plan, index) => (
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
