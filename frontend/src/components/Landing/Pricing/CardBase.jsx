import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Card } from "@material-ui/core";
import PricingEdit from "./PricingEdit";
import { useSelector } from "react-redux";
import EditButton from "../../Elements/Buttons/EditButton";
import CardHead from "./CardHead";
import CardList from "./CardList";
import CardButtons from "./CardButtons";

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
}));

export default function CardBase({ plan }) {
  const classes = useStyles();
  const [planData, setPlanData] = useState(plan);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updatePlan = (updatePlan) => {
    setPlanData(updatePlan);
    setEditing(false);
  };

  return (
    <>
      <Card className={classes.pricingCard} key={plan.title}>
        {auth.is_superuser ? (
          <>
            <EditButton
              onClick={() => setEditing(!editing)}
              editState={editing}
              color="white"
            />
          </>
        ) : null}
        {!editing ? (
          <CardContent>
            <CardHead plan={planData} />
            <CardList data={planData} />
            <CardButtons plan={planData} />
          </CardContent>
        ) : (
          <PricingEdit updatePlan={updatePlan} plan={planData} />
        )}
      </Card>
    </>
  );
}
