import React from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import Benefits from "../Benefits/Benefits";
import Timeline from "../../WIP/Timeline/Timeline";
import { Grid, makeStyles } from "@material-ui/core";
import Quiz from "../Quiz/Quiz/Quiz";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    color: theme.palette.text.dark,
    maxWidth: "100%",
  },
}));

function ServicesPage() {
  const classes = useStyles();
  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <Grid container justifyContent="center" style={{ display: "flex" }}>
        <div style={{ maxWidth: 1400, width: "100%" }}>
          <div className={classes.quizContainer}>
            <Quiz />
          </div>
        </div>
      </Grid>
    </ContentLayout>
  );
}

export default ServicesPage;
