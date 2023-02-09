import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import EditHours from "./HoursEdit";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "../../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "85%",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
}));

export default function Hours({ contactData }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(contactData);
  const [editing, setEditing] = useState(false);

  const days = [
    { day: "Monday", value: data.monday },
    { day: "Tuesday", value: data.tuesday },
    { day: "Wednesday", value: data.wednesday },
    { day: "Thursday", value: data.thursday },
    { day: "Friday", value: data.friday },
    { day: "Saturday", value: data.saturday },
    { day: "Sunday", value: data.sunday },
  ];

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
          <Typography
            variant="h5"
            style={{ paddingTop: 40, paddingBottom: 20 }}
          >
            Business Hours
          </Typography>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {days.map((day) => (
              <Grid item xs={12} sm={12} className={classes.textContainer}>
                <Typography>{day.day}:</Typography>
                {day.value === "Closed" ? (
                  <Typography className={classes.closedText}>
                    {day.value}
                  </Typography>
                ) : (
                  <Typography>{day.value}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <EditHours initialData={data} onUpdate={updateContactData} />
      )}
      {auth.is_superuser ? (
        <EditButton onClick={() => setEditing(!editing)} editState={editing} />
      ) : null}
    </>
  );
}
