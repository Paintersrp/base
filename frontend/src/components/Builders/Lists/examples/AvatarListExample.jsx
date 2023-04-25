import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";

import { avatarExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "./styles/listExampleStyles";

function AvatarListExample() {
  const classes = listExampleStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
        {avatarExampleData.map((item) => (
          <div key={item.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt={item.title}
                  src={item.avatar}
                  className={classes.avatar}
                />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.subtitle} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default AvatarListExample;
