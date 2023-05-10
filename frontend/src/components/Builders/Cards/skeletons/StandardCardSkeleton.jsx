import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import Icon from "../../../Elements/Icon/Icon";
import ShareIcon from "@material-ui/icons/Share";
import { cardExampleStyles } from "../examples/styles/cardExampleStyles";
import { initialCardData } from "../const/cardConstants";

const StandardCardSkeleton = ({ formData = null, contentObject = null }) => {
  const classes = cardExampleStyles();
  const [data, setData] = useState(formData);

  useEffect(() => {
    if (formData) {
      setData(formData);
    }
    if (contentObject && contentObject.type === "Standard") {
      setData(contentObject);
    } else {
      setData(initialCardData);
    }
  }, [formData, contentObject]);

  if (!data) {
    return null;
  }

  return (
    <Card className={classes.tileRoot}>
      <CardHeader
        className={classes.standardHeader}
        avatar={
          <Avatar className={classes.avatar}>
            {data.icon ? (
              <Icon icon={data.icon} />
            ) : (
              <Skeleton variant="circle" width={40} height={40} />
            )}
          </Avatar>
        }
        classes={{
          title: classes.standardTitle,
          subheader: classes.standardTitle,
        }}
        title={
          <React.Fragment>
            {data.header ? (
              data.header
            ) : (
              <Skeleton variant="text" width={200} />
            )}
          </React.Fragment>
        }
        subheader={
          <React.Fragment>
            {data.subheader ? (
              data.subheader
            ) : (
              <Skeleton variant="text" width={150} />
            )}
          </React.Fragment>
        }
      />
      {data.image ? (
        <CardMedia
          className={classes.media}
          image={contentObject ? data.image : URL.createObjectURL(data.image)}
          title="Paella dish"
        />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://via.placeholder.com/345x194.png?text=Image+Placeholder"
          title="Card Image"
        />
      )}
      <CardContent className={classes.standardContent}>
        {data.primary ? (
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="left"
            style={{ fontSize: "0.825rem" }}
          >
            {data.primary}
          </Typography>
        ) : (
          <Flexer fd="column" a="fs">
            <Skeleton variant="text" width={275} height={17} />
            <Skeleton variant="text" width={250} height={17} />
            <Skeleton variant="text" width={225} height={17} />
          </Flexer>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.actionButtons}>
        {data.shareToggle && (
          <Flexer j="fs">
            <IconButton size="small" aria-label="share">
              <ShareIcon />
            </IconButton>
          </Flexer>
        )}
        {data.buttonToggle && (
          <Flexer j="fe">
            <Button size="small" color="primary">
              Learn More
            </Button>
          </Flexer>
        )}
      </CardActions>
    </Card>
  );
};

export default StandardCardSkeleton;
