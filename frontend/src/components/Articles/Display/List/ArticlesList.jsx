import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Grid, Typography } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import PostList from "./PostList";
import PostSidebar from "./PostSidebar";
import { useSelector } from "react-redux";

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
    [theme.breakpoints.down("md")]: {
      position: "static",
    },
  },
}));

const ArticlesList = ({ articles, tags, handleCreate, auth }) => {
  const classes = useStyles();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);
  const editmode = useSelector((state) => state.editmode);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setTimeout(scrollToTop, 0);
  };

  const handleDateFilterClick = (filterOption) => {
    setSelectedDateFilter(filterOption);
    setTimeout(scrollToTop, 0);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const filteredArticles = articles.filter((article) => {
    if (
      selectedTags.length &&
      !article.tags.some((tag) => selectedTags.includes(tag.detail))
    ) {
      return false;
    }

    if (selectedDateFilter === 7) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(article.created_at) > sevenDaysAgo;
    }

    if (selectedDateFilter === 30) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(article.created_at) > thirtyDaysAgo;
    }

    if (selectedDateFilter === 365) {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return new Date(article.created_at) > oneYearAgo;
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
              handleCreate={handleCreate}
              auth={auth}
              handleDateFilterClick={handleDateFilterClick}
              selectedDateFilter={selectedDateFilter}
            />
          </div>
        </Grid>
      )}
    </div>
  );
};

export default ArticlesList;
