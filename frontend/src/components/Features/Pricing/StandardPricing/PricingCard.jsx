import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import PricingDetails from "./PricingDetails";
import {
  CardMedia,
  Grid,
  Typography,
  CardContent,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import PricingContact from "./PricingContact";
import { TypingEffect } from "../../../../pages/Test/Test";
import PricingEdit from "./PricingEdit";

const CustomButton = withStyles({
  label: {
    fontWeight: "700 !important",
    fontFamily: "Poppins !important",
    fontSize: "0.85rem !important",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  pricingCard: {
    color: "white",
    backgroundColor: "#212121",
    maxWidth: 375,
    minWidth: 375,
    margin: theme.spacing(4),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[7],
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.005)",
      boxShadow: theme.shadows[14],
    },

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
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
  pricingFeatures: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    minHeight: 400,
  },
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
  checkIcon: {
    color: "gold;",
    marginRight: "10px",
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

export default function PricingCard({ index, plan }) {
  const classes = useStyles();
  const [planData, setPlanData] = useState(plan);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editing, setEditing] = useState(false);

  const updatePlan = (updatePlan) => {
    console.log("Test");
    setPlanData(updatePlan);
    setEditing(false);
  };

  return (
    <>
      <Card className={classes.pricingCard} key={plan.title}>
        <Button onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </Button>
        {!editing ? (
          <CardContent>
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
            <Grid
              container
              direction="row"
              align="center"
              justifyContent="center"
            >
              <Typography className={classes.pricingPrice}>
                <div style={{ display: "flex" }}>${planData.price}/month</div>
              </Typography>
            </Grid>
            <List className={classes.pricingFeatures}>
              {planData.features.map((feature, index) => (
                <ListItem key={feature.id}>
                  <CheckIcon className={classes.checkIcon} />
                  {feature.detail}
                </ListItem>
              ))}
            </List>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CustomButton
                  className={classes.pricingButton}
                  onClick={() => setSelectedPlan(index)}
                >
                  View Details
                </CustomButton>
                {selectedPlan !== null && (
                  <PricingDetails
                    plan={planData}
                    close={() => setSelectedPlan(null)}
                  />
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
                  <PricingContact close={() => setSelectedContact(null)} />
                )}
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <PricingEdit updatePlan={updatePlan} plan={planData} />
        )}
      </Card>
    </>
  );
}
