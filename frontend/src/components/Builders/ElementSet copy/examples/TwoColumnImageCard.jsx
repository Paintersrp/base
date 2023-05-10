import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { elementSetExampleStyles } from "./styles/exampleStyles";

function TwoColumnImageCard() {
  const classes = elementSetExampleStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            image="https://source.unsplash.com/400x400/?random"
            className={classes.image}
            alt="Section Image"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card className={classes.card}>
            <CardHeader title="Card Title" subheader="Card Subtitle" />
            <CardMedia
              className={classes.media}
              image="https://via.placeholder.com/400x225.png"
              title="Card Image"
            />
            <CardContent>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac augue tristique, placerat arcu sit amet, malesuada leo.
                Integer commodo nunc id eros lacinia congue.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default TwoColumnImageCard;
