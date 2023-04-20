import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Flexer from "../../../../Elements/Layout/Container/Flexer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  media: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: "0 auto",
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  tagline: {
    fontStyle: "italic",
    marginBottom: theme.spacing(2),
  },
  content: {
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    "& ul, & ol": {
      paddingLeft: theme.spacing(3),
    },
    "& li": {
      marginBottom: theme.spacing(1),
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

function OneColumnImageText() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/800/450"
          title="Example Image"
        />

        <CardContent>
          <Typography variant="h4" className={classes.header}>
            Example Header
          </Typography>
          <Typography variant="h6" className={classes.subheader}>
            Example Subheader
          </Typography>
          <Typography variant="subtitle1" className={classes.tagline}>
            Example Tagline
          </Typography>
          <div className={classes.content}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
              augue tristique, placerat arcu sit amet, malesuada leo. Integer
              commodo nunc id eros lacinia congue. Fusce vel enim euismod,
              vulputate quam non, commodo velit.
            </Typography>
            <Typography variant="body1">
              Nam auctor ante purus, vitae ultricies dolor tincidunt vel. Sed
              mollis semper quam quis luctus. Fusce quis bibendum velit. Etiam
              quis ligula in quam malesuada facilisis.
            </Typography>
            <Typography variant="h6">Example Subsection Title</Typography>
            <Typography variant="body1">
              Mauris vel suscipit orci. Curabitur sit amet tincidunt velit.
              Vivamus vehicula ullamcorper odio, a dignissim elit. Sed quis elit
              id ex ultrices congue.
            </Typography>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OneColumnImageText;
