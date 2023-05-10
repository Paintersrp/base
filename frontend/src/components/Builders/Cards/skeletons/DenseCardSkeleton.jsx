import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import Icon from "../../../Elements/Icon/Icon";
import { cardExampleStyles } from "../examples/styles/cardExampleStyles";
import { initialCardData } from "../const/cardConstants";

export default function DenseCardSkeleton({
  formData = null,
  contentObject = null,
  subType = null,
}) {
  const classes = cardExampleStyles();
  const [data, setData] = useState(formData);

  useEffect(() => {
    if (formData) {
      setData(formData);
    }
    if (contentObject && contentObject.type === "Dense") {
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
        title={
          <React.Fragment>
            {data.header ? (
              data.header
            ) : (
              <Flexer j="c">
                <Skeleton width="65%" height={30} />
              </Flexer>
            )}
          </React.Fragment>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        {data.subheader ? (
          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            align="center"
          >
            {data.subheader}
          </Typography>
        ) : (
          <Flexer j="c">
            <Skeleton width="85%" height={25} />
          </Flexer>
        )}

        <hr className={classes.hr} />
        {data.primary ? (
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            align="center"
          >
            {data.primary}
          </Typography>
        ) : (
          <Flexer fd="column" a="fs">
            <Skeleton width="80%" height={17} />
            <Skeleton width="70%" height={17} />
            <Skeleton width="90%" height={17} />
          </Flexer>
        )}
        <Flexer j="c">
          <Avatar className={classes.avatar}>
            {data.icon ? (
              <Icon icon={data.icon} />
            ) : (
              <Skeleton variant="circle" width={40} height={40} />
            )}
          </Avatar>
        </Flexer>
        {data.secondary ? (
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            align="center"
          >
            {data.secondary}
          </Typography>
        ) : (
          <Flexer fd="column" a="fs">
            <Skeleton width="75%" height={17} />
            <Skeleton width="65%" height={17} />
            <Skeleton width="85%" height={17} />
          </Flexer>
        )}
      </CardContent>
    </Card>
  );
}
