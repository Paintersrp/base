import { makeStyles } from "@material-ui/core";

const defaultCardStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 0, 0),
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    borderRadius: theme.spacing(1),
    transition: "0.3s",
  },
  rootNoHover: {
    margin: theme.spacing(2, 0, 2, 0),
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    borderRadius: theme.spacing(1),
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2, 2, 2, 2),
    minHeight: 50,
    color: theme.palette.text.dark,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 2),
    flex: 1,
    color: theme.palette.text.dark,
  },
  cardActions: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2, 1, 2),
    minHeight: 50,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(2),
    color: theme.palette.primary.dark,
    fontSize: "2rem",
  },
}));

const listCardStyle = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(0),
    margin: theme.spacing(2, 0, 2, 0),
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    transition: "0.3s",
    height: 134,
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(0, 2, 1, 2),
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
    width: 200,
    height: 134,
  },
}));

export { defaultCardStyle, listCardStyle };
