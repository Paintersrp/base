import { makeStyles } from "@material-ui/core";

export const listExampleStyles = makeStyles((theme) => ({
  // General Classes
  root: {
    width: "90%",
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
    marginTop: 16,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },

  // Image List
  listItemImage: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      background: theme.palette.action.hover,
    },
  },
  mediaWrapper: {
    width: 120,
    marginRight: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "60%",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontStyle: "italic",
  },

  // Icon List
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  listItemIcon: {
    minWidth: theme.spacing(5),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.info.main,
  },
  listItemText: {
    fontWeight: 500,
    letterSpacing: "0.02em",
  },
  listItemSecondary: {
    fontWeight: 400,
    letterSpacing: "0.02em",
    marginTop: theme.spacing(0),
  },

  // Standard List
  standardRoot: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
  },
  standardListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(1, 1),
    paddingLeft: theme.spacing(2),
  },
  standardlistItemText: {
    fontWeight: 600,
    fontSize: "1.2rem",
  },
}));
