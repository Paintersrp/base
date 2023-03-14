import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, Icon, Paper } from "@material-ui/core";
import { IoLogoAngular } from "react-icons/io";
import Cookies from "js-cookie";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvancedSnackbar from "../../Snackbars/Snackbar";
import { setAuth, setTheme, setUser } from "../../../../lib/Actions/auth";
import useFormValidation from "../../../../hooks/useFormValidation";
import Validate from "../../../../hooks/Validate";
import bcrypt from "bcryptjs";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.palette.background.default,
    borderRadius: 14,
  },
  icon: {
    margin: theme.spacing(1),
    color: "black",
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
    backgroundColor: theme.palette.primary.main,
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
    color: "black",
    fontSize: "1.75rem",
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.text.dark}`,
    width: "100%",
  },
  field: {
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
  label: {
    color: "black",
  },
}));

const LoginForm = ({ handleLogin }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const submitLogic = async (event) => {
    event.preventDefault();
    let salt;
    let loginData;

    if (Object.keys(errors).length !== 0) {
      return;
    }

    dispatch({ type: "FETCH_DATA_REQUEST" });

    axiosInstance
      .post("/auth/salt/", { username: values.username })
      .then(async (response) => {
        if (response.data.salt) {
          salt = response.data.salt;
          const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(values.password, salt, (err, hash) => {
              if (err) reject(err);
              resolve(hash);
            });
          });

          loginData = {
            username: values.username,
            password: hashedPassword,
          };
        } else {
          loginData = {
            username: values.username,
            password: values.password,
          };
        }
      })
      .then(async (response) => {
        axiosInstance
          .post("/auth/login/", loginData)
          .then((response) => {
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
            console.log(values);
            if (values.rememberMe) {
              Cookies.set("jwt", response.data.jwt);
              Cookies.set("username", formData.username, { expires: 90 });
            }
          })
          .then(navigate("/"))
          .then(handleLogin)
          .catch((err) => {
            console.log(err);
            setOpen(true);
            setError("Invalid username or password.");
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
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Icon className={classes.icon}>
            <IoLogoAngular />
          </Icon>
          <Typography className={classes.heading}>Sign in</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              className={classes.field}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  name="rememberMe"
                  style={{ color: "black" }}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs style={{ marginTop: 5 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item style={{ marginTop: 5 }}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      {error && (
        <AdvancedSnackbar
          open={open}
          duration="4000"
          message={error}
          type="error"
          position="top-center"
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default LoginForm;
