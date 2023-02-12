import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  linkText: {
    "& .MuiTypography-body1": {
      color: "white",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
  },
}));

export default function NavigationAuthed({ toggleDrawer, handleLogout }) {
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        className={classes.links}
        component={Link}
        to="/profile"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon style={{ color: "white" }}>
          <FaUserAlt size={22} />
        </ListItemIcon>
        <ListItemText primary="Profile WIP" className={classes.linkText} />
      </ListItem>
      <ListItem
        button
        className={classes.links}
        component={Link}
        to="/"
        onClick={() => {
          toggleDrawer(false);
          handleLogout();
        }}
      >
        <ListItemIcon style={{ color: "white" }}>
          <FaSignOutAlt size={22} />
        </ListItemIcon>
        <ListItemText primary="Logout" className={classes.linkText} />
      </ListItem>
    </>
  );
}
