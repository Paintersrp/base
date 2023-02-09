import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import DetailsModal from "./DetailsModal";
import ContactModal from "./ContactModal";

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
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function CardButtons({ plan, index }) {
  const classes = useStyles();
  const [planData, setPlanData] = useState(plan);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <CustomButton
          className={classes.pricingButton}
          onClick={() => setSelectedPlan(index)}
        >
          View Details
        </CustomButton>
        {selectedPlan !== null && (
          <DetailsModal plan={planData} close={() => setSelectedPlan(null)} />
        )}
      </Grid>
      <Grid item xs={6}>
        <CustomButton
          className={classes.pricingButton}
          onClick={() => setSelectedContact(1)}
        >
          Contact
        </CustomButton>
        {selectedContact !== null && (
          <ContactModal close={() => setSelectedContact(null)} />
        )}
      </Grid>
    </Grid>
  );
}
