import { makeStyles } from "@material-ui/core";

const defaultCardStyle = makeStyles((theme) => ({
  root: {
    margin: 10,
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    borderRadius: theme.spacing(1),
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.shadows[7],
      border: `0.5px solid ${theme.palette.secondary.main}`,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2, 2, 2, 2),
    minHeight: 50,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 2, 1, 2),
    flex: 1,
  },
  cardActions: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2, 2, 2),
    minHeight: 50,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
    borderTopLeftRadius: theme.spacing(0.5),
    borderBottomLeftRadius: theme.spacing(0.5),
  },
}));

const listCardStyle = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(0),
    margin: 0,
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2, 2, 1, 2),
    minHeight: 50,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 2),
    flex: 1,
  },
  cardActions: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2, 2, 2),
    minHeight: 50,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
  },
}));

export { defaultCardStyle, listCardStyle };
