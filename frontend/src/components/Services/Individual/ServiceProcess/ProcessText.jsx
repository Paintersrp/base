import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Icon from "../../../Elements/Icon/Icon";

const useStyles = makeStyles((theme) => ({
  processItem: {
    display: "flex",
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    textAlign: "start",
  },
  processIcon: {
    minWidth: 50,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  processIconSecondary: {
    minWidth: 50,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  icon: {
    fontSize: "1.5rem",
  },
}));

function ProcessText({ textItem, index }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.processItem}>
      <ListItemIcon
        className={
          index % 2 === 0 ? classes.processIconSecondary : classes.processIcon
        }
      >
        <Icon icon={textItem.icon} className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="body2"
            align="left"
            style={{ textDecoration: "underline", fontWeight: "bold" }}
          >
            {textItem.title}
          </Typography>
        }
        secondary={
          <Typography variant="body2">{textItem.description}</Typography>
        }
      />
    </ListItem>
  );
}

export default ProcessText;
