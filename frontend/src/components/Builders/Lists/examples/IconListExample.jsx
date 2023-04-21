import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { iconExampleData } from "../utils/listExampleData";
import Text from "../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
}));

function IconListExample() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {iconExampleData.map((item) => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemIcon className={classes.listItemIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.description}
              classes={{
                primary: classes.listItemText,
                secondary: classes.listItemSecondary,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Text mt={8} mb={0} a="c" t="h4">
        Lose The Hover
      </Text>
    </div>
  );
}

export default IconListExample;
