import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { imageExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "../examples/styles/listExampleStyles";

function ImageListSkeleton({ alternate = false }) {
  const classes = listExampleStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
        {imageExampleData.map((item, index) => (
          <ListItem button className={classes.listItemImage} key={item.id}>
            {index % 2 === 0 && alternate ? (
              <React.Fragment>
                <div className={classes.mediaWrapper}>
                  <Skeleton variant="rect" width={120} height={80} />
                </div>
                <ListItemText
                  primary={<Skeleton variant="text" width={250} height={20} />}
                  secondary={
                    <Skeleton variant="text" width={200} height={20} />
                  }
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ListItemText
                  primary={<Skeleton variant="text" width={250} height={20} />}
                  secondary={
                    <Skeleton variant="text" width={200} height={20} />
                  }
                />
                <div className={classes.mediaWrapper}>
                  <Skeleton variant="rect" width={120} height={80} />
                </div>
              </React.Fragment>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ImageListSkeleton;
