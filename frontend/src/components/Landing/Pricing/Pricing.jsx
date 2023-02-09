import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import CardBase from "./CardBase";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  pricingContainer: {
    display: "flex",
    flexWrap: "wrap",
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
    <Slide in={true} direction="up" timeout={1000}>
      <div className={classes.pricingContainer}>
        {plans.map((plan, index) => (
          <CardBase index={index} plan={plan} />
        ))}
      </div>
    </Slide>
  );
}
