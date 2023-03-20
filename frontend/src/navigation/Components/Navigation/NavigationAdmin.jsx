import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import AdminPanelSettingsSharpIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import { Tooltip } from "@material-ui/core";

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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
}));

export default function NavigationAdmin({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <Tooltip
      title="Open Admin Dashboard"
      placement="right"
      classes={{ tooltip: classes.tooltip }}
    >
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
          <AdminPanelSettingsSharpIcon style={{ color: "#ff8c00" }} />
        </ListItemIcon>
        <ListItemText primary="Admin" className={classes.linkText} />
      </ListItem>
    </Tooltip>
  );
}
