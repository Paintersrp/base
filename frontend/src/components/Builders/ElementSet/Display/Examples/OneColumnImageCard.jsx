import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 325,
  },
  media: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: "0 auto",
    borderRadius: 8,
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

function OneColumnImageCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <CardMedia
            image="https://source.unsplash.com/400x400/?random"
            className={classes.image}
            alt="Section Image"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card className={classes.card}>
            <CardHeader title="Card Title" subheader="Card Subtitle" />
            <CardMedia
              className={classes.media}
              image="https://via.placeholder.com/400x225.png"
              title="Card Image"
            />
            <CardContent>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac augue tristique, placerat arcu sit amet, malesuada leo.
                Integer commodo nunc id eros lacinia congue.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default OneColumnImageCard;
