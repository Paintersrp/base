import React, { useState } from "react";
import { CardContent, Card } from "@material-ui/core";
import PricingEdit from "./PricingEdit";
import { useSelector } from "react-redux";
import CardHead from "./CardHead";
import CardList from "./CardList";
import CardButtons from "./CardButtons";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";

export default function CardBase({ plan, classes }) {
  const [planData, setPlanData] = useState(plan);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);
  const editmode = useSelector((state) => state.editmode);

  const updatePlan = (updatePlan) => {
    setPlanData(updatePlan);
    setEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!editing ? (
        <Card className={classes.pricingCard} key={plan.title}>
          <CardHead plan={planData} classes={classes} />
          <CardContent style={{ padding: "0px 8px 0px 8px" }}>
            <CardList data={planData} classes={classes} />
            <CardButtons plan={planData} />
          </CardContent>
          {!editing && editmode.editMode ? (
            <>
              <EditDeleteButtonMenu
                editClick={() => setEditing(!editing)}
                hideDelete
                position="end"
                adminLink="servicetier"
                text={`Service Tier`}
                obj={plan.id}
              />
            </>
          ) : null}
        </Card>
      ) : (
        <PricingEdit
          updatePlan={updatePlan}
          plan={planData}
          handleCancel={() => setEditing(!editing)}
        />
      )}
    </div>
  );
}
