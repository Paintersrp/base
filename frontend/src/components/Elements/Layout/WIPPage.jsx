import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    padding: theme.spacing(6, 0, 6, 0),
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  subheading: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  spinner: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
    background: theme.palette.text.secondary,
    width: "100%",
  },
  backButton: {
    marginTop: theme.spacing(2),
  },
}));

function WIPPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <div className={classes.contentContainer}>
            <Typography variant="h2" className={classes.heading}>
              Work in Progress
            </Typography>
            <Typography variant="subtitle1" className={classes.subheading}>
              We're working hard to bring you something amazing!
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
              vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
              odio.
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="body2">
              For more information, please contact us at{" "}
              <a href="mailto:info@example.com">info@example.com</a>.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.backButton}
              startIcon={<ArrowBack />}
            >
              Back to Home
            </Button>
            <CircularProgress className={classes.spinner} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default WIPPage;
