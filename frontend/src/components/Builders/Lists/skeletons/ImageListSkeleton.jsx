import React from "react";
import { CardMedia, List, ListItem, ListItemText } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { imageExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "../examples/styles/listExampleStyles";

function ImageListSkeleton({
  alternate = false,
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
            {sortedItems.map((item, index) => (
              <ListItem button className={classes.listItemImage} key={item.id}>
                {index % 2 === 0 && alternate ? (
                  <React.Fragment>
                    <div className={classes.mediaWrapper}>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title={item.name}
                      />
                    </div>
                    <ListItemText
                      primary={
                        <span className={classes.title}>{item.primary}</span>
                      }
                      secondary={
                        <span className={classes.subtitle}>
                          {item.secondary}
                        </span>
                      }
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ListItemText
                      primary={
                        <span className={classes.title}>{item.primary}</span>
                      }
                      secondary={
                        <span className={classes.subtitle}>
                          {item.secondary}
                        </span>
                      }
                    />
                    <div className={classes.mediaWrapper}>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title={item.name}
                      />
                    </div>
                  </React.Fragment>
                )}
              </ListItem>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {[...Array(2)].map((_, index) => (
              <ListItem button className={classes.listItemImage} key={index}>
                {index % 2 === 0 && alternate ? (
                  <React.Fragment>
                    <div className={classes.mediaWrapper}>
                      <Skeleton variant="rect" width={120} height={80} />
                    </div>
                    <ListItemText
                      primary={
                        <Skeleton variant="text" width={250} height={20} />
                      }
                      secondary={
                        <Skeleton variant="text" width={200} height={20} />
                      }
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ListItemText
                      primary={
                        <Skeleton variant="text" width={250} height={20} />
                      }
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
          </React.Fragment>
        )}
      </List>
    </div>
  );
}

export default ImageListSkeleton;
