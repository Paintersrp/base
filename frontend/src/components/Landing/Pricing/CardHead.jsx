import React from "react";
import { CardMedia, Grid, Typography } from "@material-ui/core";

export default function CardHead({ plan, classes }) {
  return (
    <>
      <CardMedia
        className={classes.media}
        image={plan.image}
        title={plan.service_title}
        justifyContent="center"
        alignItems="center"
      />
      <Typography className={classes.pricingTitle}>
        {plan.service_title}
      </Typography>
      <Grid container direction="row" align="center" justifyContent="center">
        <Typography className={classes.pricingPrice}>
          <div style={{ display: "flex" }}>${plan.price}/month</div>
        </Typography>
      </Grid>
    </>
  );
}
