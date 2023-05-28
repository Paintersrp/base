import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoLogoAngular } from "react-icons/io";
import {
  Icon,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Validate from "../../../../hooks/Validate";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { setAuth, setTheme, setUser } from "../../../../lib/Actions/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 3, 0),
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    minHeight: "772px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.palette.background.default,
    borderRadius: 14,
  },
  icon: {
    margin: theme.spacing(1),
    color: theme.palette.text.dark,
    fontSize: "2rem",
    width: 40,
    height: 40,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary.contrastText,
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiButton-label": {
      fontFamily: "Poppins",
      fontSize: "0.9rem",
      fontWeight: "700",
    },
    "& .MuiButton-root": {
      marginBottom: "5px",
    },
  },
  heading: {
    textAlign: "center",
    color: theme.palette.text.dark,
    fontSize: "1.75rem",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: `1px solid ${theme.palette.text.dark}`,
    width: "100%",
  },
  field: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.dark,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  label: {
    color: theme.palette.text.dark,
  },
  linkText: {
    color: "#007bff",
  },
}));

const RegisterForm = ({ handleRegister }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const submitLogic = async (event) => {
    event.preventDefault();

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const loginData = {
      username: values.username,
      password: hashedPassword,
    };

    axios
      .post("http://127.0.0.1:8000/api/auth/register/", {
        ...values,
        password: hashedPassword,
        salt: salt,
      })
      .then((res) => {
        axiosInstance.post("/auth/login/", loginData).then((response) => {
          dispatch(
            setAuth({
              is_authenticated: response.data.authenticated,
            })
          );
          dispatch(
            setUser({
              is_superuser: response.data.is_superuser,
              username: response.data.username,
            })
          );
          dispatch(
            setTheme({
              primary: response.data.primary_color,
              secondary: response.data.secondary_color,
              background: response.data.background_color,
            })
          );
          const expires = new Date(Date.parse(response.data.exp));
          Cookies.set("jwt", response.data.jwt, { expires });
          Cookies.set("username", formData.username, { expires: 90 });
        });
      })
      .then(navigate("/"))
      .then(handleRegister)
      .catch((err) => {
        console.error(err);
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

  const textFields = [
    {
      label: "First Name",
      id: "firstName",
      autoComplete: "fname",
    },
    {
      label: "Last Name",
      id: "lastName",
      autoComplete: "lname",
    },
    {
      label: "Username",
      id: "username",
      autoComplete: "username",
    },
    {
      label: "Email Address",
      id: "email",
      autoComplete: "email",
    },
    {
      label: "Password",
      id: "password",
      autoComplete: "current-password",
      type: "password",
    },
  ];

  const advancedTextFields = [
    {
      id: "phone",
      label: "Phone Number",
      autoComplete: "phone",
      type: "tel",
      grid: 12,
    },
    {
      id: "address",
      label: "Address",
      autoComplete: "address",
      type: "text",
      grid: 12,
    },
    {
      id: "city",
      label: "City",
      autoComplete: "city",
      type: "text",
    },
    {
      id: "state",
      label: "State",
      autoComplete: "state",
      type: "text",
    },

    {
      id: "zipcode",
      label: "Zipcode",
      autoComplete: "zipcode",
      type: "text",
    },
    {
      id: "country",
      label: "Country",
      autoComplete: "country",
      type: "text",
    },
  ];

  const [isAdvanced, setIsAdvanced] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth={isAdvanced ? "lg" : "xs"}>
        <Paper className={classes.paper} elevation={6}>
          <Icon className={classes.icon}>
            <IoLogoAngular />
          </Icon>
          <Typography className={classes.heading}>Register</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={isAdvanced ? (isSmallScreen ? 12 : 6) : 12}>
                <Grid container spacing={2}>
                  {textFields.map((textField) => (
                    <Grid
                      item
                      xs={
                        textField.id === "firstName" ||
                        textField.id === "lastName"
                          ? 6
                          : 12
                      }
                      key={textField.id}
                    >
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name={textField.id}
                        label={textField.label}
                        autoComplete={textField.autoComplete}
                        type={textField.type || "text"}
                        id={textField.id}
                        className={classes.field}
                        onChange={handleChange}
                        error={!!errors[textField.id]}
                        helperText={errors[textField.id]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {isAdvanced && (
                <Grid item xs={isAdvanced ? (isSmallScreen ? 12 : 6) : 12}>
                  <Grid container spacing={2}>
                    {isAdvanced &&
                      advancedTextFields.map((textField) => (
                        <Grid
                          item
                          xs={textField.grid ? textField.grid : 6}
                          key={textField.id}
                        >
                          <TextField
                            variant="outlined"
                            fullWidth
                            name={textField.id}
                            label={textField.label}
                            autoComplete={textField.autoComplete}
                            type={textField.type || "text"}
                            id={textField.id}
                            className={classes.field}
                            onChange={handleChange}
                            error={!!errors[textField.id]}
                            helperText={errors[textField.id]}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => setIsAdvanced(!isAdvanced)}>
                  {isAdvanced ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography style={{ marginLeft: 8 }}>
                  Advanced Registration
                </Typography>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid
                container
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <Link to="/login" className={classes.linkText}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterForm;
