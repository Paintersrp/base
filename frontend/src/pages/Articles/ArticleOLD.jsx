import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  tags: {
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
}));

const Article = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/articles/${id}/`
        );
        console.log(res.data);
        setArticle(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {article.title}
      </Typography>
      <Typography
        component="p"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <Typography component="p">
        <strong>Tags: </strong>
        {article.tags.map((tag) => (
          <span key={tag} className={classes.tags}>
            {tag}
          </span>
        ))}
      </Typography>
      {article.image && (
        <img
          src={`http://127.0.0.1:8000/${article.image}`}
          alt={article.title}
        />
      )}
    </Paper>
  );
};

export default Article;
