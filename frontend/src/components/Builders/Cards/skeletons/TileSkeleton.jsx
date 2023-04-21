import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Icon from "../../../Elements/Icon/Icon";

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

export default function TileSkeleton({ formData }) {
  const classes = useStyles();
  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            {data.icon ? (
              <Icon icon={data.icon} />
            ) : (
              <Skeleton variant="circle" width={40} height={40} />
            )}
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
          {data.primary ? (
            <React.Fragment>{data.primary}</React.Fragment>
          ) : (
            <Skeleton variant="text" width="80%" />
          )}
        </Typography>
        <Typography
          className={classes.secondaryText}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {data.secondary ? (
            <React.Fragment>{data.secondary}</React.Fragment>
          ) : (
            <React.Fragment>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="90%" />
            </React.Fragment>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
