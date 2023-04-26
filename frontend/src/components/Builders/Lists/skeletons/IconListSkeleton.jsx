import React from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { iconExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "../examples/styles/listExampleStyles";
import Icon from "../../../Elements/Icon/Icon";

function IconListSkeleton({
  contentObject = null,
  subType = "Standard",
  elementType,
}) {
  const classes = listExampleStyles();

  let sortedItems = null;

  if (contentObject && elementType === "List") {
    sortedItems = contentObject.items.sort((a, b) => a.order - b.order);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {sortedItems ? (
          <React.Fragment>
            {sortedItems.map((item, index) => (
              <ListItem className={classes.listItem} key={item.id}>
                <ListItemIcon className={classes.listItemIcon}>
                  <Icon icon={item.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                  classes={{
                    primary: classes.listItemText,
                    secondary: classes.listItemSecondary,
                  }}
                />
              </ListItem>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {[...Array(2)].map((_, index) => (
              <ListItem className={classes.listItem} key={index}>
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
          </React.Fragment>
        )}
      </List>
    </div>
  );
}

export default IconListSkeleton;
