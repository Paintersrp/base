import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateUpdateArticle from "./ArticleCreateUpdate";
import { CardActions, Chip, Grid } from "@material-ui/core";
import DOMPurify from "dompurify";
import ContentLayout from "../../components/Layout/ContentLayout";
import axiosInstance from "../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "99vw",
    minHeight: "80vh",
    backgroundColor: "#242424",
  },
  list: {
    width: "100%",
    backgroundColor: "#242424",
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
}));

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const nav = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/articles/")
      .then((response) => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/articles/");
  //       setArticles(res.data.articles);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <ContentLayout
      title="Articles"
      description="Where the articles be yo."
      keywords="news, posts, articles"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
    >
      <List className={classes.list}>
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              alignItems="center"
              justifyContent="center"
            >
              <Link to={`/articles/${article.id}`}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        lg={2}
                        alignItems="center"
                        justifyContent="center"
                        className={classes.imgContainer}
                      >
                        <CardMedia
                          className={classes.media}
                          image={`${article.image}`}
                          title={article.title}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        sm={9}
                        lg={10}
                        alignItems="center"
                        justifyContent="center"
                        className={classes.contentContainer}
                      >
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            alignItems="center"
                            justifyContent="center"
                            className={classes.contentContainer}
                          >
                            <div
                              style={{
                                marginLeft: 11,
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                              }}
                            >
                              <div>
                                <Typography className={classes.title}>
                                  {article.title}
                                </Typography>
                              </div>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    article.content.substr(0, 200)
                                  ),
                                }}
                                className={classes.body}
                              />
                            </div>

                            <CardActions>
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center",
                                  marginTop: 20,
                                }}
                              >
                                {article.tags.map((tag) => (
                                  <Chip
                                    key={tag.name}
                                    label={tag.name}
                                    style={{ marginRight: 10 }}
                                  />
                                ))}
                              </div>
                            </CardActions>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <Typography className={classes.author}>
                                By: {article.author}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </List>
      <Fab className={classes.fab} size="medium" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <CreateUpdateArticle open={open} setOpen={setOpen} />
    </ContentLayout>
  );
};

export default ArticleList;
