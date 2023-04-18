import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const useStyles = makeStyles((theme) => ({
  menu: {
    background: theme.palette.background.default,
  },
  bottomMenuButton: {
    color: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
}));

function TaskListBottomBar({
  filterItems,
  handleEditListClick,
  handleFilterItems,
  handleAddTaskClick,
  handleListSave,
  sections,
}) {
  const classes = useStyles();

  const handleSave = () => {
    setTimeout(() => {
      handleListSave(sections);
    }, 250);
  };

  return (
    <BottomNavigation showLabels value={null} className={classes.menu}>
      <BottomNavigationAction
        className={classes.bottomMenuButton}
        label="Manage List"
        icon={<SettingsIcon />}
        onClick={handleEditListClick}
      />

      <BottomNavigationAction
        className={classes.bottomMenuButton}
        label="Add Section"
        icon={<ListIcon />}
        onClick={handleAddTaskClick}
      />
      <BottomNavigationAction
        className={classes.bottomMenuButton}
        label={`${filterItems ? "Show" : "Hide"} Completed`}
        icon={<FilterAltIcon />}
        onClick={handleFilterItems}
      />
      <BottomNavigationAction
        className={classes.bottomMenuButton}
        label="Save List"
        icon={<SaveIcon />}
        onClick={handleSave}
      />
    </BottomNavigation>
  );
}

export default TaskListBottomBar;
