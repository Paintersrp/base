import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import axiosInstance from "../../../lib/Axios/axiosInstance";

import StyledButton from "../../Elements/Buttons/StyledButton";
import BaseForm from "../../Elements/Base/BaseForm";

const useStyles = makeStyles((theme) => ({
  formField: {
    "& .MuiOutlinedInput-root": {
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
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
}));

function HeroForm() {
  const classes = useStyles();
  const [apiError, setApiError] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/messages/", formData)
      .then(() => {
        console.log("test");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  //   const validateForm = () => {
  //     const newErrors = {};
  //     if (!formData.username) {
  //       newErrors.username = "Username is required";
  //     }
  //     if (!formData.password) {
  //       newErrors.password = "Password is required";
  //     }
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  const handleChange = (event) => {
    console.log(formData);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      subject: "Hero Contact",
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <BaseForm
        title="Ready to take the first step?"
        body="Fill out the form below and one of our experts will get in touch
        with you to schedule a consultation."
        handleSubmit={handleSubmit}
        boxShadow={2}
      >
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Full Name"
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            className={classes.formField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Email"
            id="email"
            name="email"
            variant="outlined"
            value={formData.email}
            fullWidth
            className={classes.formField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Phone"
            id="phone"
            name="phone"
            variant="outlined"
            fullWidth
            value={formData.phone}
            className={classes.formField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Message"
            id="message"
            name="message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formData.message}
            className={classes.formField}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <StyledButton type="submit" buttonText="Get in touch" />
        </Grid>
      </BaseForm>
    </div>
  );
}

export default HeroForm;
