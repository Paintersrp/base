import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  chipContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 5,
  },
}));

const ArticleAuthActions = ({ article, navigate, handleDelete }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
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
    </div>
  );
};

export default ArticleAuthActions;
