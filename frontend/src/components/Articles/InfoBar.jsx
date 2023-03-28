import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tooltip, Avatar, IconButton } from "@material-ui/core";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import EditDeleteButtonMenu from "../Elements/Buttons/EditDeleteButtonMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.grey[100],
    marginBottom: theme.spacing(2),
  },
  info: {
    display: "flex",
    alignItems: "center",
  },
  author: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    fontSize: "0.95rem",
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    maxHeight: 24,
    maxWidth: 56,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: 48,
    transition: "0.3s",
    "&:hover": {
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

function ArticleInfoBar({ article, size = "full" }) {
  const { author, author_details, created_at, content, id } = article;
  const classes = useStyles();

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={classes.root}
      style={{ marginBottom: size === "full" ? 16 : 0 }}
    >
      <div
        className={classes.info}
        style={{ marginBottom: size === "full" ? 0 : 4 }}
      >
        <Tooltip
          title={`${author_details.first_name} ${author_details.last_name}`}
        >
          <Avatar
            className={size === "full" ? classes.avatar : classes.avatarSmall}
            style={{ marginRight: 8 }}
          >
            {author_details.first_name.charAt(0).toUpperCase() ||
              author_details.username.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
        <div>
          <div className={classes.author}>
            <Typography
              variant={size === "full" ? "body1" : "body2"}
              style={{ fontSize: size === "small" ? "0.85rem" : null }}
            >
              {author_details.first_name || author_details.username}{" "}
              {author_details.last_name}
            </Typography>
          </div>
          <div className={classes.created}>
            <Typography
              variant={size === "full" ? "body1" : "body2"}
              color="textSecondary"
              style={{ fontSize: size === "small" ? "0.8rem" : null }}
            >
              {formattedDate} • {readTimeMinutes} min read
            </Typography>
          </div>
        </div>
      </div>
      <div>
        {size === "full" ? (
          <IconButton size="small" color="primary">
            <BookmarkAddOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton size="small" color="primary">
            <BookmarkAddOutlinedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

ArticleInfoBar.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleInfoBar;
