import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import EditHours from "./HoursEdit";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "../../../Elements/Buttons/EditButton";
import { baseClasses } from "../../../../classes";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    maxWidth: "85%",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

export default function Hours({ contactData }) {
  const classes = useStyles();
  const { flexCenter, fadeIn } = baseClasses();
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

  return (
    <>
      {!editing ? (
        <>
          <Typography variant="h4" className={`${classes.title} ${fadeIn}`}>
            Business Hours
          </Typography>
          <Grid container spacing={1} className={`${flexCenter} ${fadeIn}`}>
            {days.map((day) => (
              <Grid item xs={12} sm={12} className={classes.textContainer}>
                <Typography variant="subtitle2">{day.day}:</Typography>
                {day.value === "Closed" ? (
                  <Typography
                    variant="subtitle2"
                    className={classes.closedText}
                  >
                    {day.value}
                  </Typography>
                ) : (
                  <Typography variant="subtitle2">{day.value}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <EditHours initialData={data} onUpdate={updateContactData} />
      )}
      {auth.is_superuser ? (
        <div>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
            mt={15}
            mb={0}
          />
        </div>
      ) : null}
    </>
  );
}
