import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function StandardCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/id/237/345/200"
        title="Example Image"
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="h2">
          Example Title
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Example Subtitle
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="more options">
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
