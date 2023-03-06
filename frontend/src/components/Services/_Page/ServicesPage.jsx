import React from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
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
    <PageContainer
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <Grid container justifyContent="center" style={{ display: "flex" }}>
        <div style={{ maxWidth: 1400, width: "100%" }}>
          <div className={classes.quizContainer}>
            <Quiz />
          </div>
        </div>
      </Grid>
    </PageContainer>
  );
}

export default ServicesPage;
