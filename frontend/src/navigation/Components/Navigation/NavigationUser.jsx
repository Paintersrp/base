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
    width: 250,
  },
  profileIcon: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.secondary.dark,
    },
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
        <ListItemText primary={username} className={classes.linkText} />
      </ListItem>
      {/* <Link to="/profile" className={classes.links}>
        <ListItem>
          <ListItemIcon style={{ color: "white" }}>
            <AccountCircle className={classes.profileIcon} />
          </ListItemIcon>
          <ListItemText primary={username} />
        </ListItem>
      </Link> */}
      <Divider style={{ backgroundColor: "grey" }} />
    </div>
  );
}
