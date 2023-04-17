import React, { useState } from "react";
import {
  Checkbox,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Collapse,
  IconButton,
} from "@material-ui/core";
import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  addButton: {
    transition: "transform 0.3s ease-in-out",
    "&.rotate": {
      transform: "rotate(180deg)",
    },
  },
}));

const taskOptions = [
  { value: "No Priority", display: "None" },
  { value: "High Priority", display: "High" },
  { value: "Medium Priority", display: "Medium" },
  { value: "Low Priority", display: "Low" },
];

function TaskListBodyItem({
  item,
  handleToggle,
  completedTasks,
  handleTaskFormChange,
  taskFormData,
}) {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

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
            {edit ? (
              <div className={classes.listPriorty}>
                <BasicSelect
                  name="priority"
                  options={taskOptions}
                  value={taskFormData.priority}
                  onChange={handleTaskFormChange}
                />
                <IconButton
                  className={classes.addButton}
                  size="small"
                  onClick={handleOpenItemClick}
                >
                  <AddCircleOutline />
                </IconButton>
                <Checkbox
                  style={{ padding: 0 }}
                  size="small"
                  checked={isTaskCompleted(item.id || item.index)}
                  onChange={(event) =>
                    handleToggle(event, item.id || item.index)
                  }
                />
              </div>
            ) : (
              <div className={classes.listPriorty}>
                <Typography
                  className={`${classes.listSubtitle}`}
                  component="span"
                  variant="body2"
                >
                  {item.priority || "No Priority"}
                </Typography>
                <div>
                  <Checkbox
                    style={{ padding: 0, marginRight: 8 }}
                    size="small"
                    checked={isTaskCompleted(item.id || item.index)}
                    onChange={(event) =>
                      handleToggle(event, item.id || item.index)
                    }
                  />
                  <IconButton
                    className={`${classes.addButton} ${
                      descOpen ? "rotate" : ""
                    }`}
                    size="small"
                    onClick={handleOpenItemClick}
                    disabled={isTaskCompleted(item.id || item.index)}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </div>
            )}
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

export default TaskListBodyItem;
