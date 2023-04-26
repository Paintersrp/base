import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { listExampleStyles } from "../examples/styles/listExampleStyles";

function StandardListSkeleton({
  contentObject = null,
  subType = "Standard",
  elementType,
}) {
  console.log("list contentObject", contentObject);
  console.log("list elementType", elementType);
  const classes = listExampleStyles();

  let sortedItems = null;

  if (contentObject && elementType === "List") {
    sortedItems = contentObject.items.sort((a, b) => a.order - b.order);
  }

  return (
    <div className={classes.standardRoot} style={{ marginTop: 16 }}>
      <List component="ol" dense>
        {sortedItems ? (
          <React.Fragment>
            {sortedItems.map((item, index) => (
              <ListItem
                component="li"
                key={index}
                className={classes.standardListItem}
              >
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                  classes={{ primary: classes.standardlistItemText }}
                />
              </ListItem>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {[...Array(2)].map((_, index) => (
              <ListItem
                component="li"
                key={index}
                className={classes.standardListItem}
              >
                <ListItemText
                  primary={<Skeleton variant="text" width="90%" height={20} />}
                  secondary={
                    <Skeleton variant="text" width="75%" height={20} />
                  }
                  classes={{ primary: classes.standardlistItemText }}
                />
              </ListItem>
            ))}
          </React.Fragment>
        )}
      </List>
    </div>
  );
}

export default StandardListSkeleton;
