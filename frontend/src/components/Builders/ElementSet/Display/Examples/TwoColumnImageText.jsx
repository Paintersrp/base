import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  image: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: "0 auto",
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
}));

function TwoColumnImageText() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" align="center">
            Section Title
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginBottom: 0 }}
            align="center"
          >
            Section Subtitle
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            color="textSecondary"
            style={{ fontSize: "0.8rem", marginTop: 0 }}
            align="center"
          >
            Section Header
          </Typography>
          <Typography variant="body2" style={{ marginTop: 8 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            augue tristique, placerat arcu sit amet, malesuada leo. Integer
            commodo nunc id eros lacinia congue.
          </Typography>
          <Typography variant="body2" style={{ marginTop: 8 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            augue tristique, placerat arcu sit amet, malesuada leo. Integer
            commodo nunc id eros lacinia congue.
          </Typography>
          <Typography variant="body2" style={{ marginTop: 8 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            augue tristique, placerat arcu sit amet, malesuada leo. Integer
            commodo nunc id eros lacinia congue.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia
            image="https://source.unsplash.com/400x401/?random"
            className={classes.image}
            alt="Section Image"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TwoColumnImageText;
