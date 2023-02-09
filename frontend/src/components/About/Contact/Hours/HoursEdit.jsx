import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CardActions,
} from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../../Utils";
import UpdateButton from "../../../Elements/Buttons/UpdateButton";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
  field: {
    margin: 2,
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.85rem",
      width: "100%",

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      margin: 5,
      color: "black",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
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
    console.log(contactData);
    e.preventDefault();
    let formData = new FormData();
    formData.append("monday", contactData.monday);
    formData.append("tuesday", contactData.tuesday);
    formData.append("wednesday", contactData.wednesday);
    formData.append("thursday", contactData.thursday);
    formData.append("friday", contactData.friday);
    formData.append("saturday", contactData.saturday);
    formData.append("sunday", contactData.sunday);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(`http://localhost:8000/api/contact/`, formData, config);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/contact/`);
      setContactData(res.data);
      onUpdate(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" style={{ paddingTop: 40, paddingBottom: 20 }}>
          Edit Business Hours
        </Typography>
        <Grid
          container
          spacing={0}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {days.map((day) => (
            <Grid item xs={12} sm={12} className={classes.textContainer}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label={day.day}
                  margin="dense"
                  style={{ width: "100%" }}
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
