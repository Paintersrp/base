import React, { useState } from "react";
import { taskExampleData } from "./_listExampleData";
import {
  Checkbox,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import Text from "../../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 375,
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0),
    borderRadius: theme.spacing(1),
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
  },
  sectionHeader: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2),
    borderRadius: 0,
  },
  listItem: {
    padding: theme.spacing(0, 1.5, 0.5),
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
  completedTask: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
  formControl: {
    margin: theme.spacing(0.5, 0, 0, 0),

    minWidth: 120,
  },
}));

function TaskListExample({ data = taskExampleData }) {
  const classes = useStyles();
  const categories = Array.from(new Set(data.map((item) => item.category)));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openCategory, setOpenCategory] = useState([]);

  const handleToggle = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const isTaskCompleted = (taskId) => {
    return completedTasks.includes(taskId);
  };

  const getTaskClasses = (taskId) => {
    return isTaskCompleted(taskId) ? classes.completedTask : "";
  };

  const handleCategoryClick = (category) => {
    if (openCategory.includes(category)) {
      setOpenCategory(openCategory.filter((c) => c !== category));
    } else {
      setOpenCategory([...openCategory, category]);
    }
  };

  const getTaskCountByCategory = (category) => {
    const tasksInCategory = data.filter((item) => item.category === category);
    const incompleteTasks = tasksInCategory.filter(
      (item) => !completedTasks.includes(item.id)
    );
    return incompleteTasks.length;
  };

  const lastItemByCategory = {};
  data.forEach((item, index) => {
    if (
      !lastItemByCategory[item.category] ||
      index > lastItemByCategory[item.category].index
    ) {
      lastItemByCategory[item.category] = { index, id: item.id };
    }
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.header} square>
        <Text t="h5" a="c">
          Task List
        </Text>
      </Paper>
      <List component="nav" aria-label="task list" style={{ padding: 0 }}>
        {categories.map((category) => (
          <div key={category}>
            <Paper
              className={classes.sectionHeader}
              square
              onClick={() => handleCategoryClick(category)}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">{category}</Typography>
                <Typography variant="subtitle1">
                  {getTaskCountByCategory(category)} Remaining
                </Typography>
              </div>
            </Paper>
            <Collapse in={openCategory.includes(category)}>
              {data
                .filter((item) => item.category === category)
                .map((item, index) => {
                  const isLastItem =
                    lastItemByCategory[category].index === index;
                  return (
                    <React.Fragment key={item.id}>
                      <ListItem
                        className={`${classes.listItem} ${getTaskClasses(
                          item.id
                        )}`}
                      >
                        <ListItemText
                          primary={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: 4,
                              }}
                            >
                              {edit ? (
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Select
                                    style={{ width: 150 }}
                                    name="priority"
                                    value={"None"}
                                    // onChange={handleTaskFormChange}
                                  >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                  </Select>
                                  <Checkbox
                                    size="small"
                                    checked={isTaskCompleted(item.id)}
                                    onChange={() => handleToggle(item.id)}
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    className={`${classes.listSubtitle}`}
                                    component="span"
                                    variant="body2"
                                  >
                                    {item.priority || "No Priority"}
                                  </Typography>

                                  <Checkbox
                                    size="small"
                                    checked={isTaskCompleted(item.id)}
                                    onChange={() => handleToggle(item.id)}
                                  />
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
                            <div>
                              <Typography
                                className={classes.listDescription}
                                component="span"
                                variant="body2"
                              >
                                {item.description}
                              </Typography>
                            </div>
                          }
                        />
                      </ListItem>

                      {isLastItem ? null : <Divider />}
                    </React.Fragment>
                  );
                })}
            </Collapse>
          </div>
        ))}
      </List>
      {/* <Text mt={24} mb={0} a="c" t="h4">
        Lose The Hover
      </Text>
      <Text mt={24} mb={0} a="c" t="h4">
        Submit Task Updates on Page Leave
      </Text>
      <Text mt={24} mb={0} a="c" t="h4">
        Build Task Model
      </Text>
      <Text mt={24} mb={0} a="c" t="h4">
        A lot of functionality to add here
      </Text> */}
    </div>
  );
}

export default TaskListExample;
