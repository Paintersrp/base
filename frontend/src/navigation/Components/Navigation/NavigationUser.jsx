import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  profileIcon: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  links: {
    minHeight: 64,
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  divider: {
    background: theme.palette.primary.light,
  },
}));

export default function NavigationUser({ username, toggleDrawer }) {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      <ListItem
        button
        className={classes.links}
        component={Link}
        to="/profile"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon style={{ color: "white" }}>
          <AccountCircle size={22} />
        </ListItemIcon>
        <ListItemText primary={`${username}`} className={classes.linkText} />
      </ListItem>
    </div>
  );
}
