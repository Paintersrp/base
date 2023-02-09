import { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Button,
  makeStyles,
  Typography,
  Container,
  Grid,
  TextField,
  withStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const focusedColor = "orange";

const CustomButton = withStyles({
  label: {
    fontWeight: "700 !important",
    fontFamily: "Poppins !important",
    fontSize: "0.85rem !important",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242424",
  },
  container: {
    maxWidth: "600px",
    backgroundColor: "#1C1C1C",
    color: "white",
    boxShadow: theme.shadows[10],
    borderRadius: theme.shape.borderRadius.lg,
    padding: theme.spacing(6),
    direction: "column",
  },
  heading: {
    fontFamily: "Poppins",
    fontSize: "2.25rem",
    textAlign: "center",
    fontWeight: 700,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      fontSize: "1.75rem",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.main,
  },
  text: {
    marginTop: 5,
    color: "gold",
  },
}));

export default function NewsletterForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("initial");
  const [error, setError] = useState(false);

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h2" className={classes.heading}>
          Subscribe to our Newsletter
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            setState("submitting");

            setTimeout(() => {
              if (email === "fail@example.com") {
                setError(true);
                setState("initial");
                return;
              }

              setState("success");
            }, 1000);
          }}
        >
          <TextField
            className={classes.input}
            autoComplete="email"
            name="emailaddress"
            variant="outlined"
            notchedOutline
            placeholder="Your Email"
            required
            fullWidth
            id="emailaddress"
            label="Email Address"
          />
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CustomButton
                variant="contained"
                color="primary"
                disabled={state !== "initial"}
                type={state === "success" ? "button" : "submit"}
                className={classes.submit}
                endIcon={state === "success" ? <CheckIcon /> : null}
              >
                {state === "success" ? "Subscribed" : "Submit"}
              </CustomButton>
            </Grid>
          </Grid>
        </form>
        <Typography
          variant="body2"
          className={error ? classes.error : classes.text}
          align="center"
          gutterBottom
        >
          {error
            ? "Oh no an error occured! 😢 Please try again later."
            : "No spam, just news."}
        </Typography>
      </Container>
    </Box>
  );
}
