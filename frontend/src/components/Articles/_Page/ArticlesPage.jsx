import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateUpdateArticle from "../Create/ArticleCreateUpdate";
import ArticlesList from "../Display/List/ArticlesList";
import PageContainer from "../../Elements/Layout/PageContainer";
import ArticlesDisplayBase from "../Display/DisplayBase/ArticlesDisplayBase";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";

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
  const [error, setError] = useState();
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
        console.log("err: ", err);
      });
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error.message} />;
  }

  return (
    <>
      <PageContainer backgroundColor="#F5F5F5" page_name="News">
        <ArticlesDisplayBase articles={articles} />
        <ArticlesList />
        <Fab
          className={classes.fab}
          size="medium"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        <CreateUpdateArticle open={open} setOpen={setOpen} />
      </PageContainer>
    </>
  );
};

export default ArticlesPage;
