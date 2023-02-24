import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaDashcube } from "react-icons/fa";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
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

export default function NavigationAdmin({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.links}
      component={Link}
      to="/admin"
      onClick={() => {
        toggleDrawer(false);
      }}
    >
      <ListItemIcon style={{ color: "white" }}>
        <FaDashcube size={22} />
      </ListItemIcon>
      <ListItemText primary="Admin" className={classes.linkText} />
    </ListItem>
  );
}
