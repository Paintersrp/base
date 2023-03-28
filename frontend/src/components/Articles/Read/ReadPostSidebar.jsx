import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Divider,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    minWidth: 50,
  },
  chipContainer: {
    maxWidth: 200,
    padding: theme.spacing(0, 2),
    paddingTop: 16,
  },
  chipText: {
    fontSize: "0.8rem",
    fontWeight: 100,
    fontFamily: "Roboto",
    color: "#222",
  },
  sidebarContainer: {
    position: "sticky",
    top: 0,
  },
  divider: {
    margin: `${theme.spacing(1.5, 0, 1.5, 0)} !important`,
  },
  headerText: {
    color: "#222",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  authorText: {
    color: "#222",
    fontWeight: 600,
  },
  launchButton: {
    color: theme.palette.info.dark,
    "&:hover": {
      color: theme.palette.info.light,
    },
  },
  avatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginRight: theme.spacing(1.5),
    backgroundColor: theme.palette.primary.main,
  },
  thumbnail: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

const ReadPostSidebar = ({
  article,
  tags,
  author_details,
  handleCreate,
  auth,
}) => {
  const classes = useStyles();

  const wordCount = article.content ? article.content.split(" ").length : 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className={`${classes.chipContainer} ${classes.sidebarContainer}`}>
      {article.image && (
        <img
          src={article.image}
          alt="Article Thumbnail"
          className={classes.thumbnail}
        />
      )}
      <Divider className={classes.divider} />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <Avatar
          alt={`${author_details.first_name} ${author_details.last_name}`}
          src={author_details.avatar}
          className={classes.avatar}
        >
          {author_details.first_name.charAt(0).toUpperCase() ||
            author_details.username.charAt(0).toUpperCase()}
        </Avatar>

        <div>
          <Typography variant="body1" className={classes.authorText}>
            {`${author_details.first_name} ${author_details.last_name}`}
          </Typography>
          {/* <Typography className={classes.chipText}>
            {author_details.bio}
          </Typography>
          <Typography variant="subtitle1">{author_details.email}</Typography> */}
        </div>
      </div>
      <Divider className={classes.divider} />
      <Typography className={classes.chipText}>
        {`${wordCount} words • ${readTime} min read`}
      </Typography>

      <Divider className={classes.divider} />
      <Typography variant="h4" className={classes.headerText}>
        Category
      </Typography>

      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={
            <Typography className={classes.chipText}>{tag.detail}</Typography>
          }
          className={classes.chip}
        />
      ))}
      <Divider className={classes.divider} />
      <Typography className={classes.chipText} variant="subtitle2">
        {"Created: " +
          new Date(article.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
      </Typography>
      <Typography variant="subtitle2" className={classes.chipText}>
        {"Updated: " +
          new Date(article.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
      </Typography>

      <Divider className={classes.divider} />
      <Tooltip
        title={`Create Article`}
        classes={{
          tooltip: classes.tooltip,
        }}
        placement="bottom"
      >
        <IconButton
          className={classes.launchButton}
          onClick={() => handleCreate()}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={`Bookmark Article`}
        classes={{
          tooltip: classes.tooltip,
        }}
        placement="bottom"
      >
        <IconButton
          className={classes.launchButton}
          onClick={() => console.log("made ya look")}
        >
          <BookmarkAddOutlinedIcon />
        </IconButton>
      </Tooltip>

      {auth.is_superuser && (
        <Link to={`/admin/articles`}>
          <Tooltip
            title={`Articles Admin Panel`}
            classes={{
              tooltip: classes.tooltip,
            }}
            placement="bottom"
          >
            <IconButton color="primary" className={classes.launchButton}>
              <AdminPanelSettingsIcon style={{ color: "primary" }} />
            </IconButton>
          </Tooltip>
        </Link>
      )}
    </div>
  );
};

export default ReadPostSidebar;
