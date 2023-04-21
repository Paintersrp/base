import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 305,
    minWidth: 305,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    padding: theme.spacing(1.5, 1),
  },
  content: {
    padding: theme.spacing(1.5, 1),
  },
  title: {
    fontSize: "0.825rem",
  },
}));

export default function LargeCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        classes={{ title: classes.title, subheader: classes.title }}
      />
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/300x172/?foodie"
        title="Paella dish"
      />
      <CardContent className={classes.content}>
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
