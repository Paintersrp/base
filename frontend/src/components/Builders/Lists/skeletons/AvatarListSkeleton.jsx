import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";
import { listExampleStyles } from "../examples/styles/listExampleStyles";

function AvatarListSkeleton({
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
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
        {sortedItems ? (
          <React.Fragment>
            {sortedItems.map((item) => (
              <div key={item.id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={item.name}
                      src={item.icon}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {[1, 2].map((item) => (
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
          </React.Fragment>
        )}
      </List>
    </div>
  );
}

export default AvatarListSkeleton;
