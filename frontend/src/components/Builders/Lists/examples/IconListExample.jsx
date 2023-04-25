import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { iconExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "./styles/listExampleStyles";

function IconListExample() {
  const classes = listExampleStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
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
    </div>
  );
}

export default IconListExample;
