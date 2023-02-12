import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, CardMedia, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 20,
    backgroundColor: theme.palette.background.default,
  },
  tag: {
    display: "inline-block",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(0.75),
    borderRadius: theme.shape.borderRadius,
    fontSize: ".75rem",
  },
  media: {
    minHeight: 100,
    minWidth: 100,
    maxHeight: 100,
    maxWidth: 100,
    backgroundColor: "#212121",
    marginRight: theme.spacing(2),
  },
  listItem: {
    borderBottom: "1px solid black",
    // "&:not(:last-of-type)": {
    //   borderBottom: "1px solid black",
    // },
    "&:hover": {
      transform: "scale(1.005)",
      borderBottom: "0.1px solid gold",
    },
  },
  body: {
    color: "white",
  },
  author: {
    fontSize: "0.7rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
    color: "white",
  },
}));

const ArticleList = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/articles/highlighted/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <List className={classes.root}>
      {articles.map((article) => (
        <div className={classes.listItem}>
          <Link to={`/articles/${article.id}`}>
            <ListItem key={article.id}>
              <CardMedia
                className={classes.media}
                image={`http://localhost:8000/${article.image}`}
                title={article.title}
              />
              <ListItemText
                primary={
                  <>
                    <Typography
                      variant="h3"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1.5rem",
                      }}
                    >
                      {article.title}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          article.content.substr(0, 200)
                        ),
                      }}
                      className={classes.body}
                      variant="body2"
                    />
                    <Box mt={2}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        {article.tags.map((tag) => (
                          <span key={tag.id} className={classes.tag}>
                            {tag.name}
                          </span>
                        ))}
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "end",
                          }}
                        >
                          <Typography className={classes.author}>
                            By: {article.author}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </>
                }
              />
            </ListItem>
          </Link>
        </div>
      ))}
    </List>
  );
};

export default ArticleList;
