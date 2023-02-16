import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ArticleAuthActions = ({ article, navigate, handleDelete }) => {
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        style={{ marginRight: 5, marginBottom: 5 }}
        onClick={() => navigate(`/articles/${article.id}/update`)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        style={{ marginRight: 5, marginBottom: 5 }}
        size="small"
        color="primary"
        onClick={() => handleDelete(article.id)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default ArticleAuthActions;
