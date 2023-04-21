import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardMedia from "@material-ui/core/CardMedia";
import { imageExampleData } from "../utils/listExampleData";
import Text from "../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 960,
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      background: theme.palette.action.hover,
    },
  },
  mediaWrapper: {
    width: 120,
    marginRight: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "60%", // 3:2 aspect ratio
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontStyle: "italic",
  },
}));

function ImageListExample({ alternate = false }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {imageExampleData.map((item, index) => (
          <ListItem button className={classes.listItem} key={item.id}>
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
      <Text mt={8} mb={0} a="c" t="h4">
        Lose The Hover
      </Text>
    </div>
  );
}

export default ImageListExample;
