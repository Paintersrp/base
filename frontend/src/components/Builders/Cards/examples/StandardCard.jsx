import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { cardExampleStyles } from "./styles/cardExampleStyles";

export default function StandardCard() {
  const classes = cardExampleStyles();

  return (
    <Card className={classes.tileRoot}>
      <CardHeader
        className={classes.standardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        classes={{
          title: classes.standardTitle,
          subheader: classes.standardTitle,
        }}
      />
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/300x172/?foodie"
        title="Paella dish"
      />
      <CardContent className={classes.standardContent}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ fontSize: "0.825rem" }}
        >
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actionButtons}>
        <Tooltip title="Share" aria-label="share">
          <IconButton size="small" aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
