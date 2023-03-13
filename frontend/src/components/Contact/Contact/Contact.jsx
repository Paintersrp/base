import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Information from "../Information/Information";
import Hours from "../Hours/Hours";
import Social from "../Social/Social";
import Flexbox from "../../Elements/Layout/Flexbox/Flexbox";
import BaseForm from "../../Elements/Base/BaseForm";
import StyledButton from "../../Elements/Buttons/StyledButton";
import FormField from "../../Elements/Fields/FormField";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Validate from "../../../hooks/Validate";
import useFormValidation from "../../../hooks/useFormValidation";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    maxWidth: 900,
    backgroundColor: theme.palette.background.light,
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    textAlign: "left",
    width: "100%",
  },
  formTitle: {
    fontWeight: 600,
    paddingBottom: theme.spacing(2),
  },
}));

export default function Contact({ contactData, color = "light" }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const options = [
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Support", value: "Support" },
    { label: "Partnership", value: "Partnership" },
    { label: "Other", value: "Other" },
  ];

  const submitLogic = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/messages/", values)
      .then(() => {
        resetForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "None",
        });
        dispatch({ type: "ALERT_SUCCESS", message: "Message Sent" });
      })
      .then(() => {
        console.log("VALUES: ", values);
      })
      .catch((err) => {
        dispatch({
          type: "ALERT_FAIL",
          message: "Error occured, try again later",
        });
        console.log(err);
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
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Flexbox justify="center" align="center" direction="column">
          <div xs={12} sm={12}>
            <Typography variant="h2" className={classes.sectionTitle}>
              Contact Us
            </Typography>
          </div>
          <div xs={12} sm={12} md={6}>
            <Information showTitle={false} contactData={contactData} />
            <Hours showTitle={false} contactData={contactData} />
          </div>
          <div xs={12} sm={12} md={6}>
            <div style={{ width: "100%" }}>
              <BaseForm
                title="Have an Inquiry?"
                body="Fill out the form below and one of our experts will get in touch
        with you"
                handleSubmit={handleSubmit}
                boxShadow={2}
                maxWidth={400}
              >
                <Grid item xs={12}>
                  <FormField
                    key={values.subject}
                    required
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    select={true}
                    SelectProps={{
                      MenuProps: {
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      },
                    }}
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </FormField>
                  <TextField
                    margin="dense"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                    id="name"
                    name="name"
                    value={values.name}
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
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                    id="email"
                    name="email"
                    value={values.email}
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
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                    id="phone"
                    name="phone"
                    value={values.phone}
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
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    className={classes.formField}
                    id="message"
                    name="message"
                    value={values.message}
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
                    type="sumbit"
                    buttonText="Get in touch"
                  />
                </Grid>
              </BaseForm>
              <Social
                color={color}
                contactData={contactData}
                showTitle={true}
              />
            </div>
          </div>
        </Flexbox>
      </Paper>
    </div>
  );
}
