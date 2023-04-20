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
  image: {
    maxWidth: "90%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: "0 auto",
    borderRadius: 8,
    width: "100%",
  },
  card: {
    maxWidth: 325,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

function TwoColumnImageCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            image="https://source.unsplash.com/400x400/?random"
            className={classes.image}
            alt="Section Image"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
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

export default TwoColumnImageCard;
