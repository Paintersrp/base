import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
  media: {
    scale: "0.75",
    paddingTop: "56.25%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function Heading({ data }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.fadeIn}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h2" className={classes.title}>
          About {data.title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} style={{ padding: 0, margin: 0 }}>
        <CardMedia
          className={classes.media}
          image={`${data.image}`}
          title="title"
        />
      </Grid>
    </Grid>
  );
}
