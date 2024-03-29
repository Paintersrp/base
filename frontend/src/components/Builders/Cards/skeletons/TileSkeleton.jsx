import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Icon from "../../../Elements/Icon/Icon";
import { cardExampleStyles } from "../examples/styles/cardExampleStyles";
import { initialCardData } from "../const/cardConstants";

export default function TileSkeleton({
  formData = null,
  contentObject = null,
  subType = null,
}) {
  console.log(subType, "subType");
  const classes = cardExampleStyles();
  const [data, setData] = useState(formData);

  useEffect(() => {
    if (formData) {
      setData(formData);
    }
    if (contentObject && contentObject.type === "Tile") {
      setData(contentObject);
    } else {
      setData(initialCardData);
    }
  }, [formData, contentObject]);

  if (!data) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.tileHeader}
        avatar={
          <Avatar className={classes.tileAvatar}>
            {data.icon ? (
              <Icon icon={data.icon} />
            ) : (
              <Skeleton variant="circle" width={40} height={40} />
            )}
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
