import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
}));

export default function NavigationUser({ username, toggleDrawer }) {
  const classes = useStyles();

  return (
    <Tooltip
      title="View Account Profile"
      placement="right"
      classes={{ tooltip: classes.tooltip }}
    >
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
    </Tooltip>
  );
}
