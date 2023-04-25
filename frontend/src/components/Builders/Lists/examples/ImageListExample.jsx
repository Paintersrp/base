import React from "react";
import { List, ListItem, ListItemText, CardMedia } from "@material-ui/core";

import { imageExampleData } from "../utils/listExampleData";
import { listExampleStyles } from "./styles/listExampleStyles";

function ImageListExample({ alternate = false }) {
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
                  <CardMedia
                    className={classes.media}
                    image={item.imageUrl}
                    title={item.title}
                  />
                </div>
                <ListItemText
                  primary={<span className={classes.title}>{item.title}</span>}
                  secondary={
                    <span className={classes.subtitle}>{item.subtitle}</span>
                  }
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ListItemText
                  primary={<span className={classes.title}>{item.title}</span>}
                  secondary={
                    <span className={classes.subtitle}>{item.subtitle}</span>
                  }
                />
                <div className={classes.mediaWrapper}>
                  <CardMedia
                    className={classes.media}
                    image={item.imageUrl}
                    title={item.title}
                  />
                </div>
              </React.Fragment>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ImageListExample;
