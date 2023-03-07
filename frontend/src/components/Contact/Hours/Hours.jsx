import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
import EditHours from "./HoursEdit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { baseClasses } from "../../../classes";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import { Today } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  hoursContainer: {
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    background: "#F5F5F5",
  },
  dayLabel: {
    fontWeight: "bold",
  },
  closedText: {
    color: theme.palette.error.main,
    fontStyle: "italic",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  todayIcon: {
    color: theme.palette.primary.main,
    cursor: "default",
  },
}));

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Hours({ contactData, showTitle = true }) {
  const classes = useStyles();
  const { flexCenter, fadeIn } = baseClasses();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(contactData);
  const [editing, setEditing] = useState(false);

  const updateContactData = (updatedData) => {
    setData(updatedData);
    setEditing(false);
  };

  return (
    <div className={classes.hoursContainer}>
      {!editing && (
        <>
          {showTitle && (
            <Typography variant="h3" className={`${classes.title} ${fadeIn}`}>
              Business Hours
            </Typography>
          )}
          <Grid container spacing={2} className={fadeIn}>
            {daysOfWeek.map((dayOfWeek) => (
              <Grid item xs={12} sm={6} key={dayOfWeek}>
                <div className={classes.textContainer}>
                  <IconButton className={classes.todayIcon} size="small">
                    <Today />
                  </IconButton>
                  <Typography
                    variant="subtitle1"
                    className={classes.dayLabel}
                    color="primary"
                  >
                    {dayOfWeek}
                  </Typography>
                  {data[dayOfWeek.toLowerCase()] === "Closed" ? (
                    <Typography
                      variant="subtitle1"
                      className={classes.closedText}
                    >
                      {data[dayOfWeek.toLowerCase()]}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {data[dayOfWeek.toLowerCase()]}
                    </Typography>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {!editing && auth.is_superuser ? (
        <EditDeleteButtonMenu
          hideDelete
          position="center"
          placement="bottom"
          editClick={() => setEditing(!editing)}
        />
      ) : null}
      {editing && (
        <EditHours
          initialData={data}
          onUpdate={updateContactData}
          handleCancel={() => setEditing(!editing)}
        />
      )}
    </div>
  );
}
