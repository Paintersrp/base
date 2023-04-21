import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { elementSetExampleStyles } from "./styles/exampleStyles";

function OneColumnImageText() {
  const classes = elementSetExampleStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardMedia
          className={classes.image}
          image="https://picsum.photos/800/450"
          title="Example Image"
        />

        <CardContent>
          <Typography variant="h4" className={classes.header}>
            Example Header
          </Typography>
          <Typography variant="h6" className={classes.subheader}>
            Example Subheader
          </Typography>
          <Typography variant="subtitle1" className={classes.tagline}>
            Example Tagline
          </Typography>
          <div className={classes.content}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
              augue tristique, placerat arcu sit amet, malesuada leo. Integer
              commodo nunc id eros lacinia congue. Fusce vel enim euismod,
              vulputate quam non, commodo velit.
            </Typography>
            <Typography variant="body1">
              Nam auctor ante purus, vitae ultricies dolor tincidunt vel. Sed
              mollis semper quam quis luctus. Fusce quis bibendum velit. Etiam
              quis ligula in quam malesuada facilisis.
            </Typography>
            <Typography variant="h6">Example Subsection Title</Typography>
            <Typography variant="body1">
              Mauris vel suscipit orci. Curabitur sit amet tincidunt velit.
              Vivamus vehicula ullamcorper odio, a dignissim elit. Sed quis elit
              id ex ultrices congue.
            </Typography>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OneColumnImageText;
