import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InformationEdit from "./InformationEdit";
import EditButton from "../../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "85%",
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

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      {!editing ? (
        <>
          <Typography variant="h5" style={{ paddingBottom: 20 }}>
            Contact Information
          </Typography>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={12} className={classes.textContainer}>
              <Typography>Email:</Typography>
              <Typography>{data.email}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={12} className={classes.textContainer}>
              <Typography>Phone:</Typography>
              <Typography>{data.phone}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={12} className={classes.textContainer}>
              <Typography>Address:</Typography>
              <Typography>{data.address}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <InformationEdit initialData={data} onUpdate={updateContactData} />
      )}
      {auth.is_superuser ? (
        <EditButton onClick={() => setEditing(!editing)} editState={editing} />
      ) : null}
    </>
  );
}
