import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid, Typography } from "@material-ui/core";
import { TypingEffect } from "../../../pages/Test/Test";

const useStyles = makeStyles((theme) => ({
  pricingTitle: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
    fontSize: "1.75rem",
    textAlign: "center",
    fontFamily: "Poppins",
    color: "gold",
    opacity: 0.9,
  },
  pricingPrice: {
    fontSize: "1.3rem",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    margin: 0,
  },
  media: {
    height: 200,
    width: "auto",
    scale: "0.95",
    padding: 0,
    marginBottom: 20,
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
}));

export default function CardHead({ plan }) {
  const classes = useStyles();
  const [planData, setPlanData] = useState(plan);

  return (
    <>
      <CardMedia
        className={classes.media}
        image={planData.image}
        title={planData.title}
        justifyContent="center"
        alignItems="center"
      />
      <Typography className={classes.pricingTitle}>
        <TypingEffect duration="0.2" text={planData.title} />
      </Typography>
      <Grid container direction="row" align="center" justifyContent="center">
        <Typography className={classes.pricingPrice}>
          <div style={{ display: "flex" }}>${planData.price}/month</div>
        </Typography>
      </Grid>
    </>
  );
}
