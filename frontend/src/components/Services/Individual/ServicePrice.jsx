import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  price: {
    fontWeight: "bold",
    marginBottom: 8,
    textDecoration: "underline",
    textUnderlineOffset: "8px",
  },
}));

function ServicePrice({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.priceContainer}>
      <Typography
        variant="h2"
        color="primary"
        className={classes.price}
        style={{ marginBottom: 8, textDecoration: "underline" }}
      >
        ${data.price}/mo
      </Typography>
    </div>
  );
}

export default ServicePrice;
