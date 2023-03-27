import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 50,
  },
  chipContainer: {
    maxWidth: 200,
    padding: theme.spacing(2),
  },
  chipText: {
    fontSize: "0.8rem",
    fontWeight: 100,
    fontFamily: "Roboto",
  },
  sidebarContainer: {
    position: "sticky",
    top: 20,
  },
  divider: {
    margin: `${theme.spacing(1, 0, 1.5, 0)} !important`,
  },
  headerText: {
    color: "#222",
    fontWeight: 600,
  },
}));

const PostSidebar = ({ tags, handleTagClick, selectedTags }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.chipContainer} ${classes.sidebarContainer}`}>
      <Typography variant="h4" className={classes.headerText}>
        Categories
      </Typography>
      <Divider className={classes.divider} />
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={
            <Typography className={classes.chipText}>{tag.name}</Typography>
          }
          onClick={() => handleTagClick(tag.name)}
          color={selectedTags.includes(tag.name) ? "primary" : "default"}
          className={classes.chip}
        />
      ))}
      <Divider className={classes.divider} />
    </div>
  );
};

export default PostSidebar;
