import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Slide } from "@material-ui/core";
import CardBase from "./CardBase";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.light,
  },
  pricingContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.light,
    maxWidth: 1200,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Pricing() {
  const classes = useStyles();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/pricing_plans/")
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
      <Slide in={true} direction="up" timeout={1000}>
        <Grid container className={classes.pricingContainer}>
          {plans.map((plan, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className={classes.cardContainer}
            >
              <CardBase index={index} plan={plan} />
            </Grid>
          ))}
        </Grid>
      </Slide>
    </div>
  );
}
