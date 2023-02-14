import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  overlay: {
    marginTop: 80,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    background: `url(https://source.unsplash.com/801x601/?service) no-repeat center center fixed`,
    backgroundSize: "cover",
    maxWidth: 1400,
  },
  headline: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  description: {
    color: "#FFFFFF",
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  button: {
    fontWeight: "bold",
    borderRadius: 50,
    marginBottom: theme.spacing(1.5),
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
  },
  formSubtitle: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    fontSize: "0.85rem",
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

function CTASection() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Grid container flex className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.overlay}>
          <Typography variant="h3" className={classes.headline}>
            Supercharge your business today
          </Typography>
          <Typography variant="h5" className={classes.subheadline}>
            We offer cutting-edge services to help you achieve your goals
          </Typography>
          <Typography variant="body1" className={classes.description}>
            Our team of experts is dedicated to helping your business succeed.
            From strategy to execution, we have you covered.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
          >
            Get started
          </Button>
        </div>
      </Grid>
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
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.formButton}
                  type="submit"
                  size="small"
                >
                  Get in touch
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default CTASection;
