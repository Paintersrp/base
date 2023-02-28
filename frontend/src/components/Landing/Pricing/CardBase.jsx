import React, { useState } from "react";
import { CardContent, Card } from "@material-ui/core";
import PricingEdit from "./PricingEdit";
import { useSelector } from "react-redux";
import EditButton from "../../Elements/Buttons/EditButton";
import CardHead from "./CardHead";
import CardList from "./CardList";
import CardButtons from "./CardButtons";

export default function CardBase({ plan, classes }) {
  const [planData, setPlanData] = useState(plan);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updatePlan = (updatePlan) => {
    console.log("updatePlan", updatePlan);
    setPlanData(updatePlan);
    setEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!editing ? (
        <Card className={classes.pricingCard} key={plan.title}>
          <CardHead plan={planData} classes={classes} />
          <CardContent>
            <CardList data={planData} classes={classes} />
            <CardButtons plan={planData} classes={classes} />
          </CardContent>
        </Card>
      ) : (
        <PricingEdit
          updatePlan={updatePlan}
          plan={planData}
          handleCancel={() => setEditing(!editing)}
        />
      )}

      {!editing && auth.is_superuser ? (
        <>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
            mt={0}
            mb={0}
          />
        </>
      ) : null}
    </div>
  );
}
