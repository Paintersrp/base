import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import BaseContent from "../../Elements/Base/BaseContent";
import Information from "../../Contact/Information/Information";
import Social from "../../Contact/Social/Social";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import useFormValidation from "../../../hooks/useFormValidation";
import Validate from "../../../hooks/Validate";
import { useDispatch } from "react-redux";
import ContactMailSharpIcon from "@mui/icons-material/ContactMailSharp";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
  },
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
  topIcon: {
    color: theme.palette.primary.main,
  },
}));

function ServiceContact({ data, formRef, contactData }) {
  const classes = useStyles();
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const submitLogic = (event) => {
    event.preventDefault();
    values.subject = `${data.service_title} Inquiry`;

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
    <form
      item
      xs={12}
      style={{ marginTop: 24, marginBottom: 24 }}
      id="apply-now-form"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <BaseContent
        header="Contact Us"
        maxWidth={1000}
        showIcon={true}
        topIcon={
          <ContactMailSharpIcon className={classes.topIcon} fontSize="large" />
        }
      >
        <Grid container spacing={1}>
          <Grid xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              style={{ maxWidth: 700, marginTop: 8 }}
            >
              Contact us today to learn more about our {data.service_title} and
              how it can help take your business to the next level. We look
              forward to hearing from you!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              label="Name"
              id="name"
              name="name"
              required
              fullWidth
              value={values.name}
              className={classes.formField}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Email"
              type="email"
              id="email"
              name="email"
              required
              fullWidth
              value={values.email}
              className={classes.formField}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="dense"
              label="Phone"
              id="phone"
              name="phone"
              required
              fullWidth
              value={values.phone}
              className={classes.formField}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              variant="outlined"
              label="Message"
              id="message"
              name="message"
              required
              fullWidth
              multiline
              rows={4}
              value={values.message}
              className={classes.formField}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledButton
              color="primary"
              size="small"
              type="submit"
              buttonText="Send"
              startIcon={<SendSharpIcon />}
            />
          </Grid>

          <Grid
            xs={12}
            style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
          >
            <Typography
              align="center"
              variant="h3"
              gutterBottom
              style={{ maxWidth: 700 }}
            >
              Prefer to contact us via social media, email, or phone?
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {contactData && (
              <div style={{ maxWidth: 500 }}>
                <Information contactData={contactData} showTitle={false} />
                <div style={{ marginTop: 24 }}>
                  <Social
                    contactData={contactData}
                    showTitle={false}
                    color="dark"
                  />
                </div>
              </div>
            )}
          </div>
        </Grid>
      </BaseContent>
    </form>
  );
}

export default ServiceContact;
