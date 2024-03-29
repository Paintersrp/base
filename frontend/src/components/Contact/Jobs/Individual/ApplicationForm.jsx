import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import axiosInstance from "../../../../lib/Axios/axiosInstance.js";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";
import useFormValidation from "../../../../hooks/useFormValidation.jsx";
import Validate from "../../../../hooks/Validate.jsx";
import { useDispatch } from "react-redux";
import AdminButton from "../../../Elements/Buttons/AdminButton.jsx";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(0),
  },
  fileInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "100%",
  },
  fileInput: {
    display: "none",
  },
  button: {
    borderRadius: 20,
    border: `1px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.common.white,
      boxShadow: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  formField: {
    margin: theme.spacing(0, 0, 1, 0),
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.secondary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.light,
      },
    },
    "& .MuiFormLabel-root": {
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& .MuiFormControl-root": {
      margin: "0px !important",
    },
    "& input": {
      color: "black",
    },
  },
}));

const ApplicationForm = ({ job, formRef, editMode }) => {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
    resume: null,
    job: job.position,
  });
  const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const submitLogic = (event) => {
    event.preventDefault();
    console.log("here");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosInstance
      .post("/application/", values, config)
      .then(() => {
        resetForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          city: "",
          zipcode: "",
          resume: null,
          job: job.position,
        });
        dispatch({ type: "ALERT_SUCCESS", message: "Application Sent" });
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
    <form
      item
      xs={12}
      className={classes.form}
      id="apply-now-form"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <BaseContent
        header="Apply Now"
        subheader={
          <Typography color="textSecondary">
            {job.position} - {job.location} - {job.type}
          </Typography>
        }
        maxWidth={1200}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="First Name"
              id="first_name"
              name="first_name"
              type="fname"
              value={values.first_name}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.first_name}
              helperText={errors.first_name}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Last Name"
              id="last_name"
              name="last_name"
              type="lname"
              value={values.last_name}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.last_name}
              helperText={errors.last_name}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Phone"
              id="phone"
              name="phone"
              type="phone"
              value={values.phone}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="City"
              id="city"
              name="city"
              type="city"
              value={values.city}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Zip Code"
              id="zipcode"
              name="zipcode"
              type="zipcode"
              value={values.zipcode}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.zipcode}
              helperText={errors.zipcode}
              className={classes.formField}
            />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <div className={classes.fileInputContainer}>
              <input
                ref={fileInputRef}
                type="file"
                id="resume-input"
                name="resume"
                label="Resume"
                fullWidth
                inputProps={{ accept: ".pdf,.docx" }}
                onChange={handleChange}
                className={classes.fileInput}
                error={!!errors.resume}
                helperText={errors.resume}
              />
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  style={{ borderRadius: 4 }}
                  variant="outlined"
                  onClick={handleClick}
                  className={classes.button}
                >
                  <AttachFileIcon className={classes.icon} />

                  <span>
                    {values.resume ? values.resume.name : "Upload Resume"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          {errors.resume && (
            <div style={{ width: "100%" }}>
              <Typography color="error" align="center">
                {errors.resume}
              </Typography>
            </div>
          )}
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledButton
              color="primary"
              size="small"
              type="submit"
              buttonText="Submit Application"
              minWidth="0"
              endIcon={<PublishSharpIcon />}
            />
          </Grid>
        </Grid>
        {editMode && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <AdminButton tooltipText="Applications" link="application" />
          </div>
        )}
      </BaseContent>
    </form>
  );
};

export default ApplicationForm;
