import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { cardExampleStyles } from "./styles/cardExampleStyles";

export default function TileCard() {
  const classes = cardExampleStyles();

  return (
    <Card className={classes.tileRoot}>
      <CardHeader
        className={classes.tileHeader}
        avatar={
          <Avatar className={classes.tileAvatar}>
            <ShareIcon />
          </Avatar>
        }
      />
      <CardContent className={classes.tileContent}>
        <Typography
          className={classes.primaryText}
          variant="h6"
          color="textPrimary"
          component="h2"
        >
          The primary text of the card
        </Typography>
        <Typography
          className={classes.secondaryText}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          The secondary text of the card can be used to provide more information
          about the content of the card.
        </Typography>
      </CardContent>
    </Card>
  );
}
