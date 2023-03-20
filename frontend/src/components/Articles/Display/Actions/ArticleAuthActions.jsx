import React from "react";
import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginRight: 5,
    marginBottom: 5,
    color: theme.palette.primary.light,
  },
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

const ArticleAuthActions = ({ article, navigate, handleDelete }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Tooltip
        title="Edit"
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        placement="bottom"
      >
        <IconButton
          size="small"
          color="primary"
          className={classes.iconButton}
          onClick={() => navigate(`/articles/${article.id}/update`)}
        >
          <EditIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Delete"
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        placement="bottom"
      >
        <IconButton
          className={classes.iconButton}
          size="small"
          color="primary"
          onClick={() => handleDelete(article.id)}
        >
          <DeleteIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ArticleAuthActions;
