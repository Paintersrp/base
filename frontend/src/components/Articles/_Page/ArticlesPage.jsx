import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateUpdateArticle from "../Create/ArticleCreateUpdate";
import ArticlesList from "../Display/List/ArticlesList";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import ArticleCards from "../Display/Cards/ArticleCards";
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

const ArticlesPage = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/articles/highlighted/")
      .then((response) => {
        console.log("Highlighted");
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
        backgroundColor="white"
      >
        <ArticleCards articles={articles} />
        <ArticlesList />
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

export default ArticlesPage;
