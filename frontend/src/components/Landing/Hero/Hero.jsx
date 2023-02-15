import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContactButtons from "../../About/Contact/Contact/ContactButtons";
import Social from "../../About/Contact/Social/Social";
import StandardButton from "../../Elements/Buttons/StandardButton";

const useStyles = makeStyles((theme) => ({
  overlay: {
    padding: 20,
    marginTop: 80,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 60,
    },
  },
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    background: `url(https://source.unsplash.com/801x601/?service) no-repeat center center fixed`,
    backgroundSize: "cover",
    maxWidth: "100%",
    minHeight: 700,
    borderRadius: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
  headline: {
    color: theme.palette.text.light,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
  subheadline: {
    fontSize: "0.95rem",
    color: theme.palette.text.light,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  description: {
    maxWidth: 500,
    color: theme.palette.text.light,
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(3),
    borderRadius: 10,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: 360,
    margin: "0 auto",
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  formSubtitle: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    fontSize: "0.85rem",
    color: theme.palette.text.dark,
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
  formButton: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
    borderRadius: 50,
  },
}));

function Hero({ contactData, form = true }) {
  const classes = useStyles();
  const [heroData, setHeroData] = useState({
    title: "",
    heading: "",
    text: "",
    buttonText: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/heroblock/")
        .then((response) => {
          setHeroData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const [editHero, setEditHero] = useState(false);
  const [editCarousel, setEditCarousel] = useState(false);
  const auth = useSelector((state) => state.auth);
  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroData(updatedHeroBlock);
    setEditHero(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Grid container flex className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.overlay}>
          <Typography variant="h1" className={classes.headline}>
            {heroData.title}
          </Typography>
          <Typography variant="subtitle1" className={classes.subheadline}>
            {heroData.heading}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {heroData.text}
          </Typography>
          <StandardButton buttonText={heroData.buttonText} />
          <Grid item xs={12} md={12} className={classes.contactContainer}>
            {contactData ? <ContactButtons contactData={contactData} /> : null}
            {contactData ? (
              <Grid container flex justifyContent="center">
                <Social contactData={contactData} />
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Grid>
      {form ? (
        <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
          <div className={classes.form}>
            <Typography variant="h4" className={classes.formTitle}>
              Ready to take the first step?
            </Typography>
            <Typography variant="body2" className={classes.formSubtitle}>
              Fill out the form below and one of our experts will get in touch
              with you to schedule a consultation.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
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
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StandardButton buttonText="Get in touch" />
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Hero;
