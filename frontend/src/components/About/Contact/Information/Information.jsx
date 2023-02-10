import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InformationEdit from "./InformationEdit";
import EditButton from "../../../Elements/Buttons/EditButton";
import InformationField from "./InformationField";

export default function Information({ contactData }) {
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
          <Typography variant="h5" style={{ paddingBottom: 20 }}>
            Contact Information
          </Typography>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InformationField text="Email:" data={data.email} />
            <InformationField text="Phone:" data={data.phone} />
            <InformationField text="Address:" data={data.address} />
          </Grid>
        </>
      ) : (
        <InformationEdit initialData={data} onUpdate={updateContactData} />
      )}
      {auth.is_superuser ? (
        <div style={{ marginTop: 10 }}>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
          />
        </div>
      ) : null}
    </>
  );
}
