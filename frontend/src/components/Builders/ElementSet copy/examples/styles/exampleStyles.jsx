import { makeStyles } from "@material-ui/core";

export const elementSetExampleStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  image: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%",
    margin: "0 auto",
    width: "100%",
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  media: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%",
    margin: "0 auto",
    borderRadius: 8,
  },
  card: {
    maxWidth: 325,
  },
  header: {
    marginBottom: theme.spacing(0.5),
  },
  subheader: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
  },
  tagline: {
    fontStyle: "italic",
    marginBottom: theme.spacing(0),
  },
  content: {
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    "& ul, & ol": {
      paddingLeft: theme.spacing(3),
    },
    "& li": {
      marginBottom: theme.spacing(1),
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
