import React, { useRef, useState } from "react";
import { taskExampleData } from "../utils/listExampleData";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
  Collapse,
  makeStyles,
  Grid,
  Container,
  Button,
} from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";
import FormField from "../../../Elements/Fields/FormField";
import SaveButton from "../../Parts/Buttons/SaveButton";
import BasicSelect from "../../../Elements/Fields/BasicSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 375,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0),
    borderRadius: theme.spacing(1),
  },
  addFormHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 2),
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
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const taskFields = [
  { name: "category", label: "Category*", type: "text", md: 6 },
  { name: "title", label: "Title*", type: "text", md: 6 },
  {
    name: "description",
    label: "Description (Optional)",
    type: "text",
    md: 12,
    multiline: true,
  },
];

const taskOptions = [
  { value: "No Priority", display: "None" },
  { value: "Low Priority", display: "Low" },
  { value: "Medium Priority", display: "Medium" },
  { value: "High Priority", display: "High" },
];

function TaskListExample({ data = taskExampleData }) {
  const classes = useStyles();
  const categories = Array.from(new Set(data.map((item) => item.category)));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [addOpen, setAddOpen] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);
  const [listFormData, setListFormData] = useState({
    title: "",
    description: "",
  });
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

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
  const handleAddTaskClick = () => {
    setAddOpen(!addOpen);
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

  const handleListFormChange = (event) => {
    setListFormData({
      ...listFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTaskFormChange = (event) => {
    setTaskFormData({
      ...taskFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleListSave = async (event) => {
    const taskListData = {
      title: listFormData.title,
      description: listFormData.description,
      addedTasks: {
        title: taskFormData.title,
        description: taskFormData.description,
        category: taskFormData.category,
        priority: taskFormData.priority,
      },
    };

    console.log("taskListData", taskListData);

    // try {
    //   const response = await axiosInstance
    //     .post("/tasklist-builder/", taskListData)
    //     .then((response) => {
    //       //   setErrors("");
    //       //   setFaqItems([]);
    //       //   setFormData(initialState);
    //     });
    // } catch (error) {
    //   console.log(error.response.data);
    //   //   setApiErrors(error.response.data);
    // }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef(null);

  return (
    <React.Fragment>
      <Button onClick={handleAddTaskClick}>Add</Button>
      <div className={classes.root}>
        <Paper className={classes.header} square>
          <Text t="h4" a="c">
            Task List
          </Text>
        </Paper>
        <div key={"add"} style={{ marginBottom: addOpen ? 16 : 0 }}>
          <Collapse in={addOpen}>
            <Text t="h5" a="c" mt={16} mb={16}>
              Add Task
            </Text>
            <Divider variant="middle" style={{ marginBottom: 12 }} />
            <ListItem className={`${classes.listItem}`}>
              <Grid container justifyContent="center">
                <Grid
                  item
                  xs={12}
                  md={8}
                  style={{
                    paddingRight: 4,
                    paddingLeft: 4,
                    marginBottom: 8,
                    width: "100%",
                  }}
                >
                  <Typography className={classes.helpText}>
                    Priority*
                  </Typography>
                  <BasicSelect
                    name="priority"
                    options={taskOptions}
                    value={taskFormData.priority}
                    onChange={handleTaskFormChange}
                  />
                </Grid>
                {taskFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={field.md}
                      style={{ paddingRight: 4, paddingLeft: 4, width: "100%" }}
                    >
                      <Container
                        justify="flex-start"
                        style={{ width: "100%", padding: 0 }}
                      >
                        <Typography className={classes.helpText}>
                          {field.label}
                        </Typography>

                        <FormField
                          required
                          multiline={field.multiline}
                          id={field.name}
                          onChange={handleTaskFormChange}
                          value={taskFormData[field.name]}
                          minRows={3}
                        />
                      </Container>
                    </Grid>
                  );
                })}
                <div style={{ marginTop: 16 }}>
                  <SaveButton submitFunc={handleListSave} />
                </div>
              </Grid>
            </ListItem>
          </Collapse>
        </div>
        <List component="nav" aria-label="task list" style={{ padding: 0 }}>
          {categories.map((category) => (
            <div key={category}>
              <Paper
                className={classes.sectionHeader}
                square
                onClick={() => handleCategoryClick(category)}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                                    <BasicSelect
                                      name="priority"
                                      options={taskOptions}
                                      value={taskFormData.priority}
                                      onChange={handleTaskFormChange}
                                    />
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
      </div>
    </React.Fragment>
  );
}

export default TaskListExample;
