import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Grid } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ArticleControl from "./ArticleControl";
import ArticleListItem from "./ArticleListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    backgroundColor: "white",
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    maxWidth: 800,
    padding: 5,
  },
}));

const ArticleListFull = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/articles/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const onUpdate = (onUpdate) => {
    setFilteredArticles(onUpdate);
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      className={classes.root}
    >
      <ArticleControl articles={articles} onUpdate={onUpdate} />
      <Grid item xs={9}>
        <List className={classes.list}>
          {filteredArticles.map((article) => (
            <ArticleListItem article={article} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ArticleListFull;
