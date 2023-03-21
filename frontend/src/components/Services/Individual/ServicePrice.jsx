import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ServicePriceEdit from "./ServicePriceEdit";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";

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

function ServicePrice({ data, editMode }) {
  const classes = useStyles();
  const [priceData, setPriceData] = useState(data);
  const [editing, setEditing] = useState(false);

  const updatePrice = (updatePrice) => {
    setPriceData(updatePrice);
    setEditing(false);
  };

  return (
    <div className={classes.priceContainer}>
      {!editing ? (
        <Typography
          variant="h2"
          color="primary"
          className={classes.price}
          style={{ marginBottom: 8, textDecoration: "underline" }}
        >
          ${priceData.price}/mo
        </Typography>
      ) : (
        <ServicePriceEdit
          price={priceData}
          updatePrice={updatePrice}
          handleCancel={() => setEditing(!editing)}
        />
      )}
      {!editing && editMode ? (
        <div style={{ width: "100%" }}>
          <EditDeleteButtonMenu
            editClick={() => setEditing(!editing)}
            hideDelete
            position="center"
            adminLink="servicetier"
            text="Service Tier"
            obj={priceData.id}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ServicePrice;
