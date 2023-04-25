import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";
import { listExampleStyles } from "../examples/styles/listExampleStyles";

function AvatarListSkeleton() {
  const classes = listExampleStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item}>
            <ListItem button>
              <ListItemAvatar>
                <Skeleton variant="circle" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width={120} />}
                secondary={<Skeleton variant="text" width={80} />}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default AvatarListSkeleton;
