import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { CardMedia, Grid, Button, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import "./quillStyles.css";
import EditButton from "../../Elements/Buttons/EditButton";
import UpdateArticleView from "../Update/UpdateArticleView";
import { baseClasses } from "../../../classes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "99vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
  },
  card: {
    maxWidth: 1200,
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
    margin: "0px 0",
  },
  body: {
    fontFamily: "Poppins",
    fontWeight: "400 !important",
    fontSize: "0.95rem",
    letterSpacing: 0.25,
    lineHeight: 1.5,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    minHeight: 400,
    width: "100%",
    paddingBottom: "56.25%", // 16:9
    borderRadius: 8,
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "40px 0",
    "& > *": {
      margin: theme.spacing(0.5),
    },
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
  editButton: {
    display: "flex",
    justifyContent: "center",
    width: "10%",
    textAlign: "center",
    margin: "0px 20px",
  },
}));

const IndividualArticleView = ({}) => {
  const { id } = useParams();
  const { fadeIn } = baseClasses();
  const [article, setArticle] = useState({});
  const [editing, setEditing] = useState(false);
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  let htmlContent;
  console.log(auth.username);

  useEffect(() => {
    axiosInstance
      .get(`/articles/${id}/`)
      .then((response) => {
        setArticle(response.data);
        htmlContent = article.content;
        htmlContent = htmlContent.replace(/<img/g, '<img class="quill-image"');
        console.log(htmlContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${classes.root}`}>
      <Paper className={classes.card} elevation={0}>
        {auth.is_superuser ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <EditButton
              onClick={() => setEditing(!editing)}
              editState={editing}
              position="flex-end"
            />
          </div>
        ) : null}
        {!editing ? (
          <>
            <CardContent
              className={fadeIn}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {article.image && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <CardMedia
                      className={classes.image}
                      image={`${article.image}`}
                    />
                  </div>
                </div>
              )}
              {/* <Typography variant="h1" className={classes.title}> */}
              {/* {article.title}
          </Typography> */}
              {article.content ? (
                <Typography variant="body2" className={classes.body}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.content),
                    }}
                    className={classes.body}
                  />
                </Typography>
              ) : null}
            </CardContent>
            <CardActions className={classes.chips}>
              {article.tags &&
                article.tags.map((tag) => (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    className={classes.chip}
                  />
                ))}
            </CardActions>
          </>
        ) : (
          <div>
            <UpdateArticleView article={article} />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default IndividualArticleView;
