import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Grid, Typography } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import PostList from "./PostList";
import PostSidebar from "./PostSidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 60,
  },
  gridContainer: {
    maxWidth: 1020,
    backgroundColor: theme.palette.background.light,
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sidebarContainer: {
    position: "sticky",
    top: 0,
  },
}));

const ArticlesList = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/articles/")
      .then((response) => {
        setArticles([
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
          ...response.data,
        ]);
      })
      .catch((err) => {
        setError(err);
      });
    axiosInstance
      .get("/tags/")
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setTimeout(scrollToTop, 0);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const filteredArticles = articles.filter((article) => {
    if (selectedTags.length) {
      if (!article.tags.some((tag) => selectedTags.includes(tag.name))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className={classes.root}>
      {articles && tags && (
        <Grid
          container
          spacing={0}
          justifyContent="center"
          className={classes.gridContainer}
        >
          <PostList posts={filteredArticles} />
          <div className={classes.sidebarContainer}>
            <PostSidebar
              tags={tags}
              handleTagClick={handleTagClick}
              selectedTags={selectedTags}
            />
          </div>
        </Grid>
      )}
    </div>
  );
};

export default ArticlesList;
