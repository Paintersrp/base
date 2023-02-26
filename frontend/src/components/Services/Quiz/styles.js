import { makeStyles } from "@material-ui/core";

export const quizStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
  fieldset: {
    minHeight: 325,
    border: "none",
    width: "100%",
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
  formHeader: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    backgroundColor: theme.palette.background.light,
    borderRadius: "8px",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 1, 2, 1),
    },
  },
  formLabel: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: 0,
    textAlign: "center",
    width: "100%",
  },
  radioGroup: {
    marginBottom: theme.spacing(2),
  },
  formControlLabel: {
    fontSize: "1rem",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  formControlRootLabel: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  stepper: {
    [theme.breakpoints.down("xs")]: {
      "& .MuiStepLabel-label": {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(1),
      },

      "& .MuiStepLabel-iconContainer": {
        marginBottom: theme.spacing(1),
      },
    },
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));
