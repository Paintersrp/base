import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import StyledButton from "../../Elements/Buttons/StyledButton";
import BaseForm from "../../Elements/Base/BaseForm";
import useFormValidation from "../../../hooks/useFormValidation";
import Validate from "../../../hooks/Validate";
import { useDispatch } from "react-redux";

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
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const submitLogic = (event) => {
    event.preventDefault();
    values.subject = "Hero Contact";

    axiosInstance
      .post("/messages/", values)
      .then(() => {
        resetForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });
        dispatch({ type: "ALERT_SUCCESS", message: "Message Sent" });
      })
      .catch((err) => {
        setApiError(err);
        dispatch({
          type: "ALERT_FAIL",
          message: "Error occured, try again later",
        });
      });
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormValidation(formData, Validate, submitLogic);

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
            value={values.name}
            className={classes.formField}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Email"
            id="email"
            name="email"
            variant="outlined"
            value={values.email}
            fullWidth
            className={classes.formField}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
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
            value={values.phone}
            className={classes.formField}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
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
            value={values.message}
            className={classes.formField}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <StyledButton
            startIcon={<ContactMailIcon />}
            type="submit"
            buttonText="Get in touch"
          />
        </Grid>
      </BaseForm>
    </div>
  );
}

export default HeroForm;
