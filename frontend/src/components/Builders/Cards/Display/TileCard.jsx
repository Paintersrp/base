import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    borderRadius: theme.spacing(1),
  },
  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2, 0, 0, 2),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  content: {
    padding: theme.spacing(1, 2, 0, 2),
  },
  primaryText: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0.25),
  },
  secondaryText: {
    color: theme.palette.grey[600],
  },
}));

export default function TileCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            <ShareIcon />
          </Avatar>
        }
      />
      <CardContent className={classes.content}>
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
