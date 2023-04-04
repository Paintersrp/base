import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileIcon: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  links: {
    minHeight: 64,
  },
  divider: {
    background: theme.palette.primary.light,
  },
  appNameText: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
}));

export default function NavigationNoUser({ appData }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.links}>
      <Typography className={classes.appNameText}>
        {appData.business_name}
      </Typography>
    </ListItem>
  );
}
