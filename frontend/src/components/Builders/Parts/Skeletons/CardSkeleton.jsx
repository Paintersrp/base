import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
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
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  header: {
    paddingBottom: 8,
  },
  content: {
    paddingTop: 8,
  },
  actions: {
    padding: theme.spacing(0, 2, 2, 2),
    display: "flex",
    justifyContent: "flex-end",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  subActions: {
    marginTop: 0,
    marginLeft: 4,
  },
}));

const CardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Skeleton
            variant="circle"
            width={40}
            height={40}
            className={classes.avatar}
          />
        }
        action={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </div>
        }
        classes={{ action: classes.subActions }}
        title={<Skeleton variant="text" width={200} />}
        subheader={<Skeleton variant="text" width={150} />}
      />
      <CardMedia
        className={classes.media}
        image="https://via.placeholder.com/345x194.png?text=Image+Placeholder"
        title="Card Image"
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          <Skeleton variant="text" width={200} />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Skeleton variant="text" width={275} />
          <Skeleton variant="text" width={250} />
          <Skeleton variant="text" width={225} />
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Skeleton variant="rect" width={80} height={30} />
        <Skeleton variant="rect" width={80} height={30} />
      </CardActions>
    </Card>
  );
};

export default CardSkeleton;
