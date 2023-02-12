import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Link, useNavigate } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateUpdateArticle from "./ArticleCreateUpdate";
import { Button, Chip, Grid } from "@material-ui/core";
import DOMPurify from "dompurify";
import ArticleListFull from "./ArticleListFull";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContentLayout from "../../../components/Elements/Layout/ContentLayout";
import BaseCard from "../../../components/Elements/Base/BaseCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "99vw",
    minHeight: "80vh",
    backgroundColor: theme.palette.background.light,
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: "white",
  },
  card: {
    padding: 5,
    width: "100%",
    backgroundColor: "#1C1C1C",
    color: "white",
    maxHeight: 300,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#212121",
    color: "#fafafa",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
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
  author: {
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
  },
  title: {
    fontSize: "2rem",
    fontFamily: "Poppins",
    fontWeight: 700,
  },
  media: {
    height: 200,
    backgroundColor: "#212121",
  },
  body: {
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "0.8rem",
    lineHeight: 1.3,
  },
  contentContainer: {
    paddingLeft: 20,
  },
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
}));

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const nav = useNavigate();

  const actions = ({ article }) => {
    return (
      <Grid
        container
        flex
        spacing={0}
        justifyContent="space-between"
        alignItems="center"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            paddingBottom: 5,
          }}
        >
          {article.tags.map((tag) => (
            <Chip key={tag.name} label={tag.name} className={classes.chip} />
          ))}
        </div>

        <Grid container flex justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">By: Admin</Typography>
          <Link to={`/articles/${article.id}`}>
            <Button key="2" size="small" variant="contained" color="primary">
              More
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  };

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
        <List className={classes.list}>
          <Grid
            container
            spacing={0}
            flex
            justifyContent="center"
            style={{ padding: 20 }}
          >
            {articles.map((article) => (
              <Grid item style={{ padding: 10 }}>
                <BaseCard
                  title={article.title}
                  subtitle="Subtitle"
                  headerAction={[]}
                  headerTitleProps="h5"
                  headerSubheaderProps="body2"
                  media={`http://localhost:8000/${article.image}`}
                  mediaPosition="left"
                  actions={actions({ article })}
                >
                  <Typography variant="body2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          article.content.substr(0, 200)
                        ),
                      }}
                    />
                  </Typography>
                </BaseCard>
              </Grid>
            ))}
          </Grid>
        </List>
        <div
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            display: "flex",
            paddingBottom: 40,
          }}
        >
          <ArticleListFull />
        </div>
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

export default ArticleList;
