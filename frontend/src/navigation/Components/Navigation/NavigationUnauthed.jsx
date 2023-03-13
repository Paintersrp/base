import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";

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

export default function NavigationUnauthed({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        className={classes.links}
        component={Link}
        to="/register"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon style={{ color: "white" }}>
          <HowToRegSharpIcon style={{ color: "#ff8c00" }} />
        </ListItemIcon>
        <ListItemText primary="Register" className={classes.linkText} />
      </ListItem>
      <ListItem
        button
        className={classes.links}
        component={Link}
        to="/login"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon style={{ color: "white" }}>
          <LoginSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Login" className={classes.linkText} />
      </ListItem>
    </>
  );
}
