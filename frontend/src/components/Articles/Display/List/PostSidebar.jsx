import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 50,
  },
  chipContainer: {
    maxWidth: 200,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("md")]: {
      maxWidth: 1000,
    },
  },
  chipText: {
    fontSize: "0.8rem",
    fontWeight: 100,
    fontFamily: "Roboto",
  },
  sidebarContainer: {
    position: "sticky",
    top: 20,
    [theme.breakpoints.down("md")]: {
      position: "static",
    },
  },
  divider: {
    margin: `${theme.spacing(1, 0, 1.5, 0)} !important`,
  },
  headerText: {
    color: "#222",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  launchButton: {
    color: theme.palette.info.dark,
    "&:hover": {
      color: theme.palette.info.light,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

const PostSidebar = ({
  tags,
  handleTagClick,
  selectedTags,
  handleCreate,
  auth,
  handleDateFilterClick,
  selectedDateFilter,
}) => {
  const classes = useStyles();

  const dateFilters = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
    { label: "Last year", value: 365 },
    { label: "All", value: null },
  ];

  return (
    <div className={`${classes.chipContainer} ${classes.sidebarContainer}`}>
      <Typography variant="h4" className={classes.headerText}>
        Categories
      </Typography>

      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={
            <Typography className={classes.chipText}>{tag.detail}</Typography>
          }
          onClick={() => handleTagClick(tag.detail)}
          color={selectedTags.includes(tag.detail) ? "primary" : "default"}
          className={classes.chip}
        />
      ))}
      <Divider className={classes.divider} />
      <Typography variant="h4" className={classes.headerText}>
        Filter by Date
      </Typography>

      {dateFilters.map((filter) => (
        <Chip
          key={filter.value}
          label={filter.label}
          onClick={() => handleDateFilterClick(filter.value)}
          color={selectedDateFilter === filter.value ? "primary" : "default"}
          className={classes.chip}
        />
      ))}
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

export default PostSidebar;
