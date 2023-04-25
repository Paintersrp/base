import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import { Favorite, Share } from "@material-ui/icons";
import { cardExampleStyles } from "./styles/cardExampleStyles";

function LargerCard() {
  const classes = cardExampleStyles();

  return (
    <Card className={classes.tileRoot}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Upgraded Card Example"
        subheader="April 21, 2023"
      />
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/600x300/?foodie"
        title="Random Image"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />

        <Typography variant="body1" color="textSecondary" component="p">
          Proin auctor metus ut ultricies interdum. Nullam suscipit ligula in
          semper laoreet. Morbi vel est at lorem tincidunt tincidunt. Sed
          blandit ullamcorper nulla, vel fringilla velit pellentesque ac. Donec
          finibus vitae mauris vel auctor. Nulla pharetra sapien in eros
          malesuada volutpat. Proin auctor metus ut ultricies interdum. Nullam
          suscipit ligula in semper laoreet. Morbi vel est at lorem tincidunt
          tincidunt.
        </Typography>
      </CardContent>
      <Divider />
      <IconButton>
        <Favorite />
      </IconButton>
      <IconButton>
        <Share />
      </IconButton>
    </Card>
  );
}

export default LargerCard;
