import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
} from "@material-ui/core";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    margin: theme.spacing(0.5),
    background: "#3f3f3f",
    color: "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& input": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& textarea": {
      color: "white",
    },
  },

  field: {
    "& .MuiOutlinedInput-inputMultiline": {
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
    marginBottom: 5,
  },
  label: {
    color: "white",
  },
  select: {
    color: "black",
    borderColor: "black",
    textAlign: "left",
    marginBottom: 5,
    "& .MuiSelect-root": {
      color: "black",
      borderColor: "black",
    },
    "& .MuiSelect-icon": {
      color: "black",
      borderColor: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      borderColor: "black",
    },
    "& .MuiSelect-select": {
      color: "black",
    },
    "& .MuiSelect-select:focus": {
      color: "black",
      borderColor: "black",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      color: "black",
      borderColor: "black",
    },
    "& .MuiFormLabel-root": {
      color: "black !important",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  label: {
    color: "black",
    "& .MuiFormLabel-root": {
      color: "black !important",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
  },
  button: {
    minWidth: 140,
    boxShadow: theme.shadows[3],
    backgroundColor: "#1C1C1C",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
  },
  errorText: {
    color: "#f44336",
    margin: 0,
    marginTop: "3px",
    textAlign: "left",
    fontWeight: 400,
    marginLeft: "14px",
    marginRight: "14px",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    lineHeight: "1.66",
    letterSpacing: "0.03333em",
  },
}));

const ContactForm = (props) => {
  const { selectOptions } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    errors: {},
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Invalid email address"
      )
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
        "Invalid phone number"
      )
      .required("Phone number is required"),
    subject: Yup.string()
      .min(10, "Please select a service.")
      .required("Please select a service"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData);
    } catch (err) {
      const errors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormData({ ...formData, errors });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              error={formData.errors.subject}
              className={classes.select}
              labelId="subject-label"
              id="subject"
              name="subject"
              label="subject"
              value={formData.subject}
              onChange={handleChange}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {selectOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formData.errors.subject && (
              <div className={classes.errorText}>{formData.errors.subject}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            className={classes.field}
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="dense"
            value={formData.name}
            onChange={handleChange}
            error={formData.errors.name}
            helperText={formData.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            className={classes.field}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
            error={formData.errors.email}
            helperText={formData.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            className={classes.field}
            id="phone"
            name="phone"
            label="Phone"
            variant="outlined"
            margin="dense"
            value={formData.phone}
            onChange={handleChange}
            error={formData.errors.phone}
            helperText={formData.errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            className={classes.field}
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            margin="dense"
            multiline
            minRows={4}
            value={formData.message}
            onChange={handleChange}
            error={formData.errors.message}
            helperText={formData.errors.message}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button type="submit" variant="contained" className={classes.button}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ContactForm.defaultProps = {
  selectOptions: [],
};

export default ContactForm;
