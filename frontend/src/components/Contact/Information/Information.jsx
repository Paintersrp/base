import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InformationEdit from "./InformationEdit";
import EditButton from "../../Elements/Buttons/EditButton";
import InformationField from "./InformationField";
import { baseClasses } from "../../../classes";
import ContactButtons from "../Contact/ContactButtons";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function Information({ contactData }) {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
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
          <Typography variant="h3" className={`${classes.title} ${fadeIn}`}>
            Contact Information
          </Typography>
          <Grid
            container
            spacing={2}
            className={`${classes.textContainer} ${fadeIn}`}
          >
            <InformationField text="Email:" data={data.email} />
            <InformationField text="Phone:" data={data.phone} />
            <InformationField text="Address:" data={data.address} />
            <ContactButtons contactData={data} />
          </Grid>
        </>
      ) : (
        <InformationEdit
          initialData={data}
          onUpdate={updateContactData}
          handleCancel={() => setEditing(!editing)}
        />
      )}
      {!editing && auth.is_superuser ? (
        <div>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
            mt={25}
            mb={10}
          />
        </div>
      ) : null}
    </>
  );
}
