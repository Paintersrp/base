import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import DOMPurify from "dompurify";
import BaseCard from "../../../components/Elements/Base/BaseCard";
import ArticleHighlightActions from "./ArticleHighlightActions";
import ArticleAuthActions from "./ArticleAuthActions";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import axios from "axios";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  defaultCardStyle,
  listCardStyle,
} from "../../../components/Elements/Base/BaseCardStyles";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: "white",
  },
  listContainer: {
    padding: 20,
  },
}));

const ArticleHighlightList = ({
  articles,
  classSet = "default",
  mediaPosition = "left",
  header = { variant: "h3" },
  subtitle = { variant: "subtitle1" },
  body = "body1",
  actionSubtitle = "subtitle1",
}) => {
  let classes;
  let elevation;
  const { auth } = useSelector((state) => state);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (classSet === "list") {
    classes = listCardStyle();
    elevation = 0;
    mediaPosition = "list";
    header = { variant: "h5" };
    subtitle = { variant: "subtitle2" };
    body = "body2";
    actionSubtitle = "subtitle2";
  } else if (classSet === "default") {
    classes = defaultCardStyle();
    elevation = 1;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const handleDelete = (id) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/articles/${id}/`);
    axiosInstance
      .get("/articles/")
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const renderArticles = (article) => {
    const html = DOMPurify.sanitize(article.content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      heading.outerHTML = "";
    });

    const modifiedHtml = doc.body.innerHTML;
    const text = parser.parseFromString(modifiedHtml, "text/html").body
      .textContent;
    const truncatedText = text.substr(0, 250) + "...";

    return (
      <Grid item>
        <BaseCard
          title={article.title}
          subtitle="Subtitle"
          headerAction={
            auth.is_superuser ? (
              <ArticleAuthActions
                article={article}
                handleDelete={handleDelete}
                navigate={navigate}
              />
            ) : null
          }
          headerTitleProps={header}
          headerSubheaderProps={subtitle}
          media={`${article.image}`}
          mediaPosition={mediaPosition}
          classes={classes}
          elevation={elevation}
          actions={
            <ArticleHighlightActions
              subtitleVariant={actionSubtitle}
              article={article}
            />
          }
        >
          <Typography variant={body} style={{ marginBottom: 5 }}>
            {truncatedText}
          </Typography>
        </BaseCard>
      </Grid>
    );
  };

  return (
    <List className={classes.list}>
      <Grid
        container
        spacing={0}
        flex
        justifyContent="center"
        className={classes.listContainer}
      >
        {articles.map((article) => renderArticles(article))}
      </Grid>
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this Article?"
      />
    </List>
  );
};

export default ArticleHighlightList;
