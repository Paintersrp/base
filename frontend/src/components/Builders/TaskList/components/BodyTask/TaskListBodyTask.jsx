import React, { useState } from "react";
import {
  Checkbox,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Collapse,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmMenu from "../../../Parts/Menus/ConfirmMenu";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0.5, 1.5),
    margin: 0,
  },
  listHeader: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  listSubtitle: {
    marginTop: 1,
    color: theme.palette.text.secondary,
  },
  listDescription: {
    color: theme.palette.text.primary,
  },
  listPriorty: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listPrimaryContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  completedTask: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
  expandButton: {
    marginRight: 2,
    color: theme.palette.info.light,
    transition: "transform 0.3s ease-in-out",
    "&.rotate": {
      transform: "rotate(180deg)",
    },
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
  editButton: {
    color: theme.palette.success.main,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.background.default,
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.default,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

function TaskListBodyTask({
  item,
  handleToggle,
  completedTasks,
  section,
  handleEditClick,
  handleDeleteClick,
}) {
  const classes = useStyles();
  const [descOpen, setDescOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenItemClick = () => {
    setDescOpen(!descOpen);
  };

  const isTaskCompleted = (taskId) => {
    return completedTasks.includes(taskId);
  };

  const getTaskClasses = (taskId) => {
    return isTaskCompleted(taskId) ? classes.completedTask : "";
  };

  return (
    <ListItem
      className={`${classes.listItem} ${getTaskClasses(item.id || item.index)}`}
    >
      <ListItemText
        style={{ margin: 0 }}
        primary={
          <div className={classes.listPrimaryContainer}>
            <div className={classes.listPriorty}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title={`Mark ${
                    isTaskCompleted(item.id || item.index)
                      ? "Incomplete"
                      : "Complete"
                  }`}
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Checkbox
                    style={{ padding: 0, marginRight: 6 }}
                    size="small"
                    checked={isTaskCompleted(item.id || item.index)}
                    onChange={(event) =>
                      handleToggle(event, item.id || item.index, section)
                    }
                  />
                </Tooltip>
                <Typography
                  className={`${classes.listSubtitle}`}
                  component="span"
                  variant="body2"
                >
                  {item.priority || "No Priority"}
                </Typography>
              </div>
              <div>
                <Tooltip
                  title="Edit Task"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    style={{ marginRight: 0, marginLeft: 6 }}
                    className={classes.editButton}
                    size="small"
                    onClick={() => handleEditClick(section, item)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Delete Task"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    style={{ marginRight: 2, marginLeft: 2 }}
                    className={classes.deleteButton}
                    size="small"
                    onClick={handleOpen}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <ConfirmMenu
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  confirmClick={() => handleDeleteClick(section, item.id)}
                />
                <Tooltip
                  title="Expand Task"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    className={`${classes.expandButton} ${
                      descOpen ? "rotate" : ""
                    }`}
                    size="small"
                    onClick={handleOpenItemClick}
                    disabled={isTaskCompleted(item.id || item.index)}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <Typography
                className={`${classes.listHeader}`}
                component="span"
                variant="body1"
              >
                {item.title}
              </Typography>
            </div>
          </div>
        }
        secondary={
          <Collapse in={descOpen}>
            <div>
              <Typography
                className={classes.listDescription}
                component="span"
                variant="body2"
              >
                {item.description}
              </Typography>
            </div>
          </Collapse>
        }
      />
    </ListItem>
  );
}

export default TaskListBodyTask;
