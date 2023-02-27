import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { MenuItem } from "@material-ui/core";
import * as Yup from "yup";
import FormField from "../../Fields/FormField";
import StyledButton from "../../Buttons/StyledButton";
import Flexbox from "../../Layout/Flexbox/Flexbox";

const useStyles = makeStyles((theme) => ({
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
  flexBox: {
    padding: 0,
  },
}));

const ContactForm = (props) => {
  const classes = useStyles();
  const { selectOptions } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      <Flexbox className={classes.flexBox}>
        <div xs={12} className={classes.flexBox}>
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
        </div>
        {fields.map((field) => (
          <div xs={12} key={field.id} className={classes.flexBox}>
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
          </div>
        ))}
        <div xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <StyledButton type="submit" buttonText="Submit" />
        </div>
      </Flexbox>
    </form>
  );
};

ContactForm.defaultProps = {
  selectOptions: [],
};

export default ContactForm;
