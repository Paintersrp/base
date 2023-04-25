import React from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { iconExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "../examples/styles/listExampleStyles";

function IconListSkeleton() {
  const classes = listExampleStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {iconExampleData.map((item) => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemIcon className={classes.listItemIcon}>
              <Skeleton variant="square" width={32} height={32} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  className={classes.listItemText}
                />
              }
              secondary={
                <Skeleton
                  variant="text"
                  width={150}
                  height={16}
                  className={classes.listItemSecondary}
                />
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default IconListSkeleton;
