import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as Yup from "yup";
import FormField from "../../Fields/FormField";
import StyledButton from "../../Buttons/StyledButton";

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
    margin: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      margin: 5,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

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
      fontFamily: "Roboto",
      margin: 4,
      color: "black",
      fontWeight: "450",
      fontSize: "1rem",
      letterSpacing: 0.5,
    },
    "& input": {
      color: "black",
    },
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
    "& .MuiOutlinedInput-root": {
      margin: 5,
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      borderColor: "black",
      paddingTop: 10.5,
      paddingBottom: 10.5,
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
      fontFamily: "Roboto",
      margin: 4,
      color: "black",
      fontWeight: "450",
      fontSize: "1rem",
      letterSpacing: 0.5,
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
    marginTop: 10,
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

  const fields = [
    { name: "name", label: "Name", multiline: false },
    { name: "email", label: "Email", multiline: false },
    { name: "phone", label: "Phone", multiline: false },
    { name: "message", label: "Message", multiline: true },
  ];

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
          <FormField
            id="subject"
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleChange}
            error={formData.errors.subject}
            helperText={formData.errors.subject}
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {selectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormField>
        </Grid>
        {fields.map((field) => (
          <Grid item xs={12} key={field.id}>
            <FormField
              id={field.name}
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              multiline={field.multiline}
              minRows={field.minRows}
              onChange={handleChange}
              error={formData.errors[field.name]}
              helperText={formData.errors[field.name]}
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <StyledButton type="submit" buttonText="Submit" />
        </Grid>
      </Grid>
    </form>
  );
};

ContactForm.defaultProps = {
  selectOptions: [],
};

export default ContactForm;
