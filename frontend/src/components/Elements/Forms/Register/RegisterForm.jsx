import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { IoLogoAngular } from "react-icons/io";
import { Icon, Paper, Typography } from "@material-ui/core";
import Validate from "../../../../hooks/Validate";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { setAuth, setTheme, setUser } from "../../../../lib/Actions/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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

  const submitLogic = (event) => {
    const loginData = {
      username: values.username,
      password: values.password,
    };
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/auth/register/", values)
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
          Cookies.set("jwt", response.data.jwt, { expires: 7 });
          if (formData.rememberMe) {
            Cookies.set("username", formData.username, { expires: 90 });
          }
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

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Icon className={classes.icon}>
            <IoLogoAngular />
          </Icon>
          <Typography className={classes.heading}>Register</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  className={classes.field}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  className={classes.field}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  className={classes.field}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className={classes.field}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={classes.field}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
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
                <Link href="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterForm;
