import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiEnergySword } from "react-icons/gi";
import { useMediaQuery } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import useFormValidation from "../../../hooks/useFormValidation";
import Validate from "../../../hooks/Validate";
import CheckIcon from "@material-ui/icons/Check";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
    minHeight: 200,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  link: {
    fontWeight: 700,
    margin: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  grid: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    textAlign: "center",
    margin: theme.spacing(2, 0),
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
  icon: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridForm: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  gridSocial: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
  },
  businessName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  input: {
    margin: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.light,
      },
      "& fieldset": {
        borderColor: theme.palette.text.light,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.light,
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
  startIcon: {
    paddingRight: 8,
  },
  socialIcons: {
    padding: theme.spacing(0.5),
    marginTop: theme.spacing(0),
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      color: theme.palette.primary.light,
      backgroundColor: "inherit",
    },
  },
  iconButton: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: "inherit",
    },
  },
}));

const links = [
  { name: "About", href: "about" },
  {
    name: "Services",
    href: "services",
  },
  {
    name: "Contact",
    href: "contact",
  },
  {
    name: "News",
    href: "articles",
  },
  {
    name: "Support",
    href: "support",
  },
  {
    name: "Privacy",
    href: "privacy",
  },
  {
    name: "Terms",
    href: "terms",
  },
];

export default function Footer({ socialData }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [state, setState] = useState("initial");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});

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
      })
      .catch((error) => {
        setError(true);
        setState("initial");
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

  const socialPlatforms = [
    {
      name: "facebook",
      icon: <FacebookIcon className={classes.iconButton} />,
    },
    {
      name: "twitter",
      icon: <TwitterIcon className={classes.iconButton} />,
    },
    {
      name: "instagram",
      icon: <InstagramIcon className={classes.iconButton} />,
    },
    {
      name: "linkedin",
      icon: <LinkedInIcon className={classes.iconButton} />,
    },
    {
      name: "youtube",
      icon: <YouTubeIcon className={classes.iconButton} />,
    },
    {
      name: "github",
      icon: <GitHubIcon className={classes.iconButton} />,
    },
  ];

  return (
    <footer className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item xs={12} sm={12} md={3} className={classes.gridForm}>
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
                    startIcon={<NewspaperIcon />}
                    endIcon={state === "success" ? <CheckIcon /> : null}
                  >
                    {state === "success" ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
            <Link to="/" className={classes.businessName}>
              <div className={classes.link}>
                <Typography variant="h2" className={classes.link}>
                  <GiEnergySword size="24" />
                  EDGELORDS
                </Typography>
              </div>
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: !isSmallScreen ? "row" : "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {links.map((link) => (
                <Link key={link.name} to={link.href} className={classes.link}>
                  {link.name}
                </Link>
              ))}
            </div>
            <Typography variant={"subtitle1"} className={classes.typography}>
              Copyright © {new Date().getFullYear()} EDGELORDS. All rights
              reserved.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={3} className={classes.gridSocial}>
            <Typography variant="h6" className={classes.typography}>
              Follow us
            </Typography>
            {socialData && (
              <div
                style={{
                  maxWidth: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Grid
                  container
                  className={classes.socialIcons}
                  style={{
                    maxWidth: "50%",
                  }}
                >
                  {socialPlatforms.map((platform) => {
                    if (socialData[platform.name]) {
                      return (
                        <Grid item xs={4}>
                          <IconButton
                            key={platform.name}
                            className={classes.socialIcons}
                            aria-label={platform.name}
                            href={`https://www.${platform.name}.com/${
                              socialData[platform.name]
                            }`}
                          >
                            {platform.icon}
                          </IconButton>
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Grid>
              </div>
            )}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <IconButton href="#" className={classes.icon}>
                <FaFacebook />
              </IconButton>
              <IconButton href="#" className={classes.icon}>
                <FaTwitter />
              </IconButton>
              <IconButton href="#" className={classes.icon}>
                <FaInstagram />
              </IconButton>
            </div> */}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
