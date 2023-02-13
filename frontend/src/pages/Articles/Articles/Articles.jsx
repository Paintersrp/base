import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateUpdateArticle from "../Create/ArticleCreateUpdate";
import ArticleListFull from "./ArticleListFull";
import ContentLayout from "../../../components/Elements/Layout/ContentLayout";
import ArticleHighlightList from "./ArticleHighlightList";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(15),
    right: theme.spacing(5),
    backgroundColor: "#fff",
    color: "#242424",
    "&:hover": {
      backgroundColor: "#3e3e3e",
      color: "#fff",
    },
  },
}));

const Articles = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/articles/highlighted/")
      .then((response) => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <>
      <ContentLayout
        title="Articles"
        description="Where the articles be yo."
        keywords="news, posts, articles"
        image="https://example.com/image.png"
        url="https://example.com/example-page"
      >
        <ArticleHighlightList articles={articles} />
        <ArticleListFull />
        <Fab
          className={classes.fab}
          size="medium"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        <CreateUpdateArticle open={open} setOpen={setOpen} />
      </ContentLayout>
    </>
  );
};

export default Articles;
