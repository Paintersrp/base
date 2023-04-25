import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

import { listExampleStyles } from "./styles/listExampleStyles";

function StandardList() {
  const classes = listExampleStyles();

  return (
    <div className={classes.standardRoot}>
      <List component="ol" dense style={{ padding: 0 }}>
        <ListItem component="li" className={classes.standardListItem}>
          <ListItemText
            primary="First item"
            secondary="This is the description for the first item."
            classes={{ primary: classes.standardlistItemText }}
          />
        </ListItem>
        <ListItem component="li" className={classes.standardListItem}>
          <ListItemText
            primary="Second item"
            secondary="This is the description for the second item."
            classes={{ primary: classes.standardlistItemText }}
          />
        </ListItem>
        <ListItem component="li" className={classes.standardListItem}>
          <ListItemText
            primary="Third item"
            secondary="This is the description for the third item."
            classes={{ primary: classes.standardlistItemText }}
          />
        </ListItem>
      </List>
    </div>
  );
}

export default StandardList;
