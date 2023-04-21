import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
  },
  hr: {
    width: "100%",
    borderBottom: "1px solid #d9d9d9",
    margin: theme.spacing(2, 0),
  },
  list: {
    width: "100%",
    textAlign: "left",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  avatar: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function DenseSkeleton({ formData }) {
  const classes = useStyles();
  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);

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
