import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, CardMedia } from "@material-ui/core";
import FAQTabs from "../../../FAQs/Display/FAQTabs";
import FAQList from "../../../FAQs/Display/FAQList";

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
}));

function OneColumnAccordionImage() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            image="https://source.unsplash.com/400x401/?random"
            className={classes.image}
            alt="Section Image"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FAQList />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OneColumnAccordionImage;
