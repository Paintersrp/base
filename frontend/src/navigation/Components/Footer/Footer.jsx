import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Divider,
  FormControl,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import TokenSharpIcon from "@mui/icons-material/TokenSharp";
import { Link } from "react-router-dom";
import useFormValidation from "../../../hooks/useFormValidation";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Validate from "../../../hooks/Validate";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import CheckIcon from "@material-ui/icons/Check";
import { useDispatch } from "react-redux";
import { links, socialPlatforms } from "./FooterData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4, 0, 2, 0),
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    textAlign: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  logoIcon: {
    marginRight: theme.spacing(1),
  },
  appTitle: {
    fontWeight: 600,
    fontSize: "1.25rem",
  },
  title: {
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: 0,
  },
  link: {
    color: theme.palette.primary.contrastText,
    marginTop: 2,
    fontWeight: 300,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  divider: {
    margin: theme.spacing(4, 0),
    backgroundColor: theme.palette.primary.light,
  },
  disclaimer: {
    color: theme.palette.primary.light,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.light,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.light,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.light,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.light,
    },
  },
  formControl: {
    margin: theme.spacing(1, 0),
    color: "white",
  },
  button: {
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiButton-startIcon": {
      margin: "0px !important",
    },
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    marginRight: 4,
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  iconButton: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

const Footer = ({ socialData }) => {
  const classes = useStyles();
  const [state, setState] = useState("initial");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const submitLogic = (e) => {
    e.preventDefault();
    setError(false);
    setState("submitting");

    axiosInstance
      .post("/subscribe/", values)
      .then((response) => {
        setState("success");
        setFormData({ email: "" });
        resetForm({ email: "" });
        dispatch({ type: "ALERT_SUCCESS", message: "Subscribed" });
      })
      .catch((error) => {
        setError(true);
        setState("initial");
        dispatch({ type: "ALERT_FAIL", message: "Subscription Failed" });
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
      <Container className={classes.container}>
        <div className={classes.logo}>
          <Tooltip
            title={`View Home Page`}
            placement="right"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link href="#" className={classes.link} style={{ display: "flex" }}>
              <TokenSharpIcon
                className={classes.logoIcon}
                style={{ fontSize: "1.6rem" }}
              />
              <Typography variant="h4" className={classes.appTitle}>
                EDGELORDS
              </Typography>
            </Link>
          </Tooltip>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <form onSubmit={handleSubmit}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.input}
                  autoComplete="email"
                  margin="dense"
                  name="email"
                  variant="outlined"
                  notchedOutline
                  placeholder="Your Email"
                  required
                  fullWidth
                  id="emailaddress"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className={classes.button}
                    classes={{ startIcon: classes.startIcon }}
                    disabled={state !== "initial"}
                    type={state === "success" ? "button" : "submit"}
                    startIcon={<NewspaperIcon style={{ marginRight: 8 }} />}
                    endIcon={
                      state === "success" ? (
                        <CheckIcon style={{ marginRight: 8 }} />
                      ) : null
                    }
                  >
                    {state === "success" ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {links.map((link) => (
                <div>
                  <Typography>
                    <Tooltip
                      title={`View ${link.name} Page`}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link
                        key={link.name}
                        to={link.href}
                        className={classes.link}
                      >
                        {link.name}
                      </Link>
                    </Tooltip>
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" className={classes.title}>
              Connect with Us
            </Typography>
            {socialData && (
              <div
                style={{
                  maxWidth: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {socialPlatforms.map((platform) => {
                  if (socialData[platform.name]) {
                    return (
                      <Tooltip
                        title={`@${socialData[platform.name]}`}
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          size="small"
                          key={platform.name}
                          className={classes.socialIcons}
                          aria-label={platform.name}
                          href={`https://www.${platform.name}.com/${
                            socialData[platform.name]
                          }`}
                        >
                          <platform.icon className={classes.iconButton} />
                        </IconButton>
                      </Tooltip>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="body2" className={classes.disclaimer}>
          © 2023 EDGELORDS. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
