import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InformationEdit from "./InformationEdit";
import EditButton from "../../../Elements/Buttons/EditButton";
import InformationField from "./InformationField";

const useStyles = makeStyles(() => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

export default function Information({ contactData }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(contactData);
  const [editing, setEditing] = useState(false);

  const updateContactData = (updateContactData) => {
    setData(updateContactData);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <>
          <Typography variant="h4" className={classes.title}>
            Contact Information
          </Typography>
          <Grid container spacing={2} className={classes.textContainer}>
            <InformationField text="Email:" data={data.email} />
            <InformationField text="Phone:" data={data.phone} />
            <InformationField text="Address:" data={data.address} />
          </Grid>
        </>
      ) : (
        <InformationEdit initialData={data} onUpdate={updateContactData} />
      )}
      {auth.is_superuser ? (
        <div>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
          />
        </div>
      ) : null}
    </>
  );
}
