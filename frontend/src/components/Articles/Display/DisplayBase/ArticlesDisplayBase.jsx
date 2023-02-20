import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import DOMPurify from "dompurify";
import BaseCard from "../../../Elements/Base/Card/BaseCard";
import ArticleHighlightActions from "../Actions/ArticleHighlightActions";
import ArticleAuthActions from "../Actions/ArticleAuthActions";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Actions/DeleteConfirmationModal";
import axios from "axios";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  defaultCardStyle,
  listCardStyle,
} from "../../../Elements/Base/Card/BaseCardStyles";
import { SlideIntoViewPort } from "../../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";

const ArticlesDisplayBase = ({
  articles,
  classSet = "default",
  mediaPosition = "left",
  header = { variant: "h3" },
  subtitle = { variant: "subtitle1" },
  body = "body1",
  actionSubtitle = "subtitle1",
}) => {
  const { auth } = useSelector((state) => state);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let layout;

  if (classSet === "list") {
    mediaPosition = "list";
    layout = {
      // Styling
      classes: listCardStyle(),
      actionSubtitle: "subtitle2",
      header: { variant: "h5" },
      subtitle: { variant: "subtitle2" },
      body: "body2",
      elevation: 0,

      // Grid
      sm: 12,
      md: 12,
      lg: 12,
    };
  } else if (classSet === "cards") {
    mediaPosition = "top";
    layout = {
      // Styling
      classes: defaultCardStyle(),
      actionSubtitle: actionSubtitle,
      header: header,
      subtitle: subtitle,
      body: body,
      elevation: 1,
      style: {
        transform: "scale(0.85)",
      },

      // Grid
      sm: 12,
      md: 12,
      lg: 4,
    };
  } else if (classSet === "default") {
    layout = {
      // Styling
      classes: defaultCardStyle(),
      actionSubtitle: actionSubtitle,
      header: header,
      subtitle: subtitle,
      body: body,
      elevation: 1,

      // Grid
      sm: 0,
      md: 0,
      lg: 0,
    };
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
      <Grid
        item
        sm={layout.sm}
        md={layout.md}
        lg={layout.lg}
        style={layout.style}
      >
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
          headerTitleProps={layout.header}
          headerSubheaderProps={layout.subtitle}
          media={`${article.image}`}
          mediaPosition={mediaPosition}
          classes={layout.classes}
          elevation={layout.elevation}
          actions={
            <ArticleHighlightActions
              subtitleVariant={layout.actionSubtitle}
              article={article}
            />
          }
        >
          <Typography variant={layout.body} style={{ marginBottom: 5 }}>
            {truncatedText}
          </Typography>
        </BaseCard>
      </Grid>
    );
  };

  return (
    // <List className={layout.classes.list}>
    <>
      <Grid
        container
        spacing={0}
        flex
        justifyContent="center"
        style={{ flexWrap: "wrap" }}
      >
        {articles.map((article) => renderArticles(article))}
      </Grid>

      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this Article?"
      />
    </>
    // </List>
  );
};

export default ArticlesDisplayBase;
