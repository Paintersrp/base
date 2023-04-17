import React, { useState } from "react";
import {
  List,
  Divider,
  Typography,
  Paper,
  Collapse,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import TaskListBodyItem from "./TaskListBodyItem";
import { AddCircleOutline } from "@material-ui/icons";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import TaskListTaskForm from "./TaskListTaskForm";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  taskCountLight: {
    backgroundColor: theme.palette.success.light,
  },
  taskCountMedium: {
    backgroundColor: theme.palette.secondary.main,
  },
  taskCountHeavy: {
    backgroundColor: theme.palette.error.main,
  },
  taskCount: {
    display: "flex",
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(0, 0.75),
    margin: theme.spacing(0.5, 0.5, 0.5, 0),
    borderRadius: theme.shape.borderRadius,
    alignItems: "center",
    fontSize: "0.75rem",
  },
  categoryTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    color: theme.palette.info.light,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
}));

function TaskListBody({
  handleTaskFormChange,
  taskFormData,
  handleTaskAdd,
  sections,
  setCompletedTasks,
  completedTasks,
  taskErrors,
  handleErrors,
  filterItems,
}) {
  const classes = useStyles();
  const [addOpen, setAddOpen] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);

  const handleToggle = (event, taskId) => {
    event.stopPropagation();
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const handleCategoryClick = (event, category) => {
    if (openCategory.includes(category)) {
      setOpenCategory(openCategory.filter((c) => c !== category));
    } else {
      setOpenCategory([...openCategory, category]);
    }
  };
  const handleAddCategory = (event, category) => {
    event.stopPropagation();
    if (addOpen.includes(category)) {
      setAddOpen(addOpen.filter((c) => c !== category));
    } else {
      setAddOpen([...addOpen, category]);
    }
  };

  const getTaskCountByCategory = (category) => {
    console.log(sections);
    const sectionIndex = sections.findIndex(
      (section) => section.title === category
    );
    const tasksInCategory = sections[sectionIndex].tasks;
    console.log("tasksInCategory", tasksInCategory);
    const incompleteTasks = tasksInCategory.filter(
      (item) => !completedTasks.includes(item.id)
    );
    return incompleteTasks.length;
  };

  return (
    <React.Fragment>
      <List
        component="nav"
        aria-label="task list"
        style={{ padding: 0 }}
        dense={true}
      >
        {sections.map((category) => {
          return (
            <div key={category.title}>
              <Paper
                className={classes.sectionHeader}
                square
                onClick={(event) => handleCategoryClick(event, category.title)}
              >
                <div className={classes.categoryTitle}>
                  <Flexer j="fs">
                    <LabelImportantIcon style={{ marginRight: 4 }} />
                    <Typography variant="subtitle1">
                      {category.title}
                    </Typography>
                  </Flexer>
                  <Flexer j="fe">
                    <Typography
                      variant="subtitle2"
                      className={`${classes.taskCount}
                        ${
                          getTaskCountByCategory(category.title) >= 6
                            ? classes.taskCountHeavy
                            : getTaskCountByCategory(category.title) >= 3
                            ? classes.taskCountMedium
                            : classes.taskCountLight
                        }
                      `}
                    >
                      Tasks: {getTaskCountByCategory(category.title)}
                    </Typography>
                    <IconButton
                      className={classes.addButton}
                      size="small"
                      onClick={(event) =>
                        handleAddCategory(event, category.title)
                      }
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Flexer>
                </div>
              </Paper>
              <Divider variant="inset" />

              {addOpen.includes(category.title) ? <Divider /> : null}
              <Collapse in={openCategory.includes(category.title)}>
                {category.tasks
                  .sort((a, b) => {
                    const priorityOrder = [
                      "High Priority",
                      "Medium Priority",
                      "Low Priority",
                      "No Priority",
                    ];
                    return (
                      priorityOrder.indexOf(a.priority) -
                      priorityOrder.indexOf(b.priority)
                    );
                  })
                  .map((item, index) => {
                    console.log(item, "item");
                    if (filterItems) {
                      if (item.status === "Complete") {
                        return null;
                      }
                    }
                    return (
                      <React.Fragment key={item.id}>
                        <TaskListBodyItem
                          item={item}
                          index={index}
                          handleToggle={handleToggle}
                          completedTasks={completedTasks}
                          handleTaskFormChange={(event) =>
                            handleTaskFormChange(event, category.title)
                          }
                          taskFormData={taskFormData}
                        />

                        <Divider />
                      </React.Fragment>
                    );
                  })}
              </Collapse>
              <TaskListTaskForm
                key={category.title}
                handleTaskFormChange={(event) =>
                  handleTaskFormChange(event, category.title)
                }
                handleCancel={(event) =>
                  handleAddCategory(event, category.title)
                }
                taskFormData={taskFormData[category.title]}
                addOpen={addOpen.includes(category.title)}
                handleTaskAdd={handleTaskAdd}
                sections={sections}
                errors={taskErrors}
                handleErrors={handleErrors}
              />
            </div>
          );
        })}
      </List>
    </React.Fragment>
  );
}

export default TaskListBody;
