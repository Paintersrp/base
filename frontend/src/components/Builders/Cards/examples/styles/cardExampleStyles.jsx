import { makeStyles } from "@material-ui/core";

export const cardExampleStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  hr: {
    width: "100%",
    borderBottom: "1px solid #d9d9d9",
    margin: theme.spacing(2, 0),
  },
  list: {
    width: "100%",
    textAlign: "left",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  avatar: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.secondary.main,
  },
  tileHeader: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2, 0, 0, 2),
  },
  tileAvatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  primaryText: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0.25),
  },
  tileContent: {
    padding: theme.spacing(1, 2, 0, 2),
  },
  tileRoot: {
    maxWidth: 345,
    minWidth: 345,
    borderRadius: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", 
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  standardHeader: {
    padding: theme.spacing(1.5, 1),
  },
  standardContent: {
    padding: theme.spacing(1.5, 1),
  },
  standardTitle: {
    fontSize: "0.825rem",
  },
}));
