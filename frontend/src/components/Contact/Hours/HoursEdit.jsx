import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { getCookie } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: 20,
  },
  fieldContainer: {
    width: "90%",
  },
}));

export default function EditHours({ initialData, onUpdate }) {
  const classes = useStyles();
  const [contactData, setContactData] = useState(initialData);

  const handleChange = (event, day) => {
    setContactData({
      ...contactData,
      [day]: event.target.value,
    });
  };

  const days = [
    { day: "Monday", value: contactData.monday },
    { day: "Tuesday", value: contactData.tuesday },
    { day: "Wednesday", value: contactData.wednesday },
    { day: "Thursday", value: contactData.thursday },
    { day: "Friday", value: contactData.friday },
    { day: "Saturday", value: contactData.saturday },
    { day: "Sunday", value: contactData.sunday },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/contact/`,
        contactData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/contact/`);
      setContactData(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" className={classes.title}>
          Edit Business Hours
        </Typography>
        <Grid container spacing={0}>
          {days.map((day) => (
            <Grid item xs={12} sm={12} className={classes.textContainer}>
              <div className={classes.fieldContainer}>
                <FormField
                  label={day.day}
                  value={day.value}
                  onChange={(event) =>
                    handleChange(event, day.day.toLowerCase())
                  }
                />
              </div>
            </Grid>
          ))}
        </Grid>
        <UpdateButton />
      </form>
    </>
  );
}
