import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Input, Button } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import axiosInstance from "../../../../lib/Axios/axiosInstance.js";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: theme.palette.background.light,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  location: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
  },
  employmentType: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
  },
  applyButton: {
    marginLeft: "auto",
    maxHeight: 40,
  },
  referButton: {
    marginRight: theme.spacing(2),
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(4),
  },
  requirementItem: {
    marginBottom: theme.spacing(0),
  },
  requirementIcon: {
    color: theme.palette.primary.main,
  },
  whyApply: {
    marginBottom: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(0),
  },
  submitButton: {
    marginTop: theme.spacing(0),
  },
  fileInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "100%",
  },
  fileInputLabel: {
    display: "flex",
    alignItems: "center",
  },
  attachFileIcon: {
    marginRight: theme.spacing(1),
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
}));

const ApplicationForm = ({ job, formRef }) => {
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
    job: job.id,
  });

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosInstance
      .post("/application/", formData, config)
      .then(() => {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          city: "",
          zipcode: "",
          resume: null,
          job: job.id,
        });
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  const handleChange = (event) => {
    console.log(formData);
    if (event.target.name === "resume") {
      setFormData({
        ...formData,
        resume: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

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
              value={formData.first_name}
              onChange={handleChange}
              required
              fullWidth
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
              value={formData.last_name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
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
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
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
              value={formData.city}
              onChange={handleChange}
              required
              fullWidth
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
              value={formData.zipcode}
              onChange={handleChange}
              required
              fullWidth
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
                required
                fullWidth
                inputProps={{ accept: ".pdf,.docx" }}
                onChange={handleChange}
                className={classes.fileInput}
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
                    {formData.resume ? formData.resume.name : "Upload Resume"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledButton
              color="primary"
              size="medium"
              type="submit"
              buttonText="Submit Application"
              minWidth="0"
            />
          </Grid>
        </Grid>
      </BaseContent>
    </form>
  );
};

export default ApplicationForm;
