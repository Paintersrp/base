import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { elementSetExampleStyles } from "./styles/exampleStyles";

function TwoColumnTextDense() {
  const classes = elementSetExampleStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" className={classes.sectionTitle}>
            Section Title
          </Typography>
          <div className={classes.content}>
            <Typography variant="h5" gutterBottom>
              Subsection Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
              augue tristique, placerat arcu sit amet, malesuada leo. Integer
              commodo nunc id eros lacinia congue. Fusce vel enim euismod,
              vulputate quam non, commodo velit.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nam auctor ante purus, vitae ultricies dolor tincidunt vel. Sed
              mollis semper quam quis luctus. Fusce quis bibendum velit. Etiam
              quis ligula in quam malesuada facilisis.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Another Subsection Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              Mauris vel suscipit orci. Curabitur sit amet tincidunt velit.
              Vivamus vehicula ullamcorper odio, a dignissim elit. Sed quis elit
              id ex ultrices congue.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" className={classes.sectionTitle}>
            Section Title
          </Typography>
          <div className={classes.content}>
            <Typography variant="body1" gutterBottom>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Donec semper lectus eget lectus efficitur
              rhoncus. Sed fermentum elit elit, id cursus est pretium at.
              Suspendisse feugiat consequat eros, vel maximus lorem efficitur
              vel. Aenean dapibus tincidunt rutrum.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Subsection Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fusce ac sapien augue. Nulla nec bibendum ante. Vivamus eget velit
              sapien. Nam malesuada lacinia ipsum in tempor. Curabitur at
              dapibus orci.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Another Subsection Title
            </Typography>
            <Typography variant="body1">
              Mauris vel suscipit orci. Curabitur sit amet tincidunt velit.
              Vivamus vehicula ullamcorper odio, a dignissim elit. Sed quis elit
              id ex ultrices congue.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default TwoColumnTextDense;
