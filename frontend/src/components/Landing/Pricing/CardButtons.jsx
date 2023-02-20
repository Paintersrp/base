import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import DetailsModal from "./DetailsModal";
import ContactModal from "./ContactModal";
import StyledButton from "../../Elements/Buttons/StyledButton";

const CustomButton = withStyles({
  label: {
    fontWeight: "700 !important",
    fontFamily: "Poppins !important",
    fontSize: "0.85rem !important",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  pricingButton: {
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function CardButtons({ plan, index, classes }) {
  // const classes = useStyles();
  const [planData, setPlanData] = useState(plan);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} justifyContent="center" style={{ display: "flex" }}>
        <StyledButton
          onClick={() => setSelectedPlan(index)}
          buttonText="View Details"
        />
        {selectedPlan !== null && (
          <DetailsModal
            classes={classes}
            plan={planData}
            close={() => setSelectedPlan(null)}
          />
        )}
      </Grid>
    </Grid>
  );
}
