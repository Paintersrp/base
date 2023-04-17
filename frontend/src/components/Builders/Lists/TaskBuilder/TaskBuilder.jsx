import React, { useState } from "react";
import {
  Select,
  MenuItem,
  makeStyles,
  Paper,
  Grid,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";
import FormField from "../../../Elements/Fields/FormField";
import TaskListExample from "../../Parts/Examples/Lists/TaskListExample.jsx";
import BaseContent from "../../../Elements/Base/BaseContent";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import Text from "../../../Elements/Layout/Text/Text";
import SaveButton from "../../Parts/Buttons/SaveButton";
import AddButton from "../../Parts/Buttons/AddButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    width: "100%",
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  subheader: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  select: {
    width: "100%",
    maxHeight: "50px",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,

      padding: "10.5px 16px 10.5px",
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 64,
      overflowY: "auto",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },
}));

const listFields = [
  { name: "title", label: "List Title*", type: "text", md: 8 },
  {
    name: "description",
    label: "Description Text*",
    type: "text",
    md: 8,
    multiline: true,
  },
];
const sectionFields = [
  { name: "title", label: "List Title*", type: "text", md: 8 },
  {
    name: "description",
    label: "Description Text*",
    type: "text",
    md: 8,
    multiline: true,
  },
];
const taskFields = [
  { name: "title", label: "Task Title*", type: "text", md: 6 },
  {
    name: "description",
    label: "Description Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
];

const TaskListBuilder = () => {
  const classes = useStyles();
  const [listFormData, setListFormData] = useState({
    title: "",
    description: "",
  });
  const [sectionFormData, setSectionFormData] = useState({
    title: "",
    description: "",
  });
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    priority: "",
    section: "",
  });
  const [addedTasks, setAddedTasks] = useState([]);
  const [sections, setSections] = useState([]);

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
  const handleSectionFormChange = (event) => {
    setSectionFormData({
      ...sectionFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSectionAdd = () => {
    const newSection = {
      title: sectionFormData.title,
      description: sectionFormData.description,
      tasks: [],
    };
    setSections([...sections, newSection]);
    setSectionFormData({
      title: "",
      description: "",
    });
  };

  // const handleTaskAdd = () => {
  //   setAddedTasks([...addedTasks, taskFormData]);
  //   setTaskFormData({
  //     title: "",
  //     description: "",

  //     priority: "",
  //   });
  // };

  const handleTaskAdd = () => {
    const sectionIndex = sections.findIndex(
      (section) => section.title === taskFormData.section
    );

    const updatedSection = {
      ...sections[sectionIndex],
      tasks: [...sections[sectionIndex].tasks, taskFormData],
    };

    const updatedSections = [...sections];
    updatedSections[sectionIndex] = updatedSection;

    setSections(updatedSections);

    setTaskFormData({
      title: "",
      description: "",
      priority: "",
      section: "",
    });
  };

  const handleListSave = async (event) => {
    // const taskListData = {
    //   title: listFormData.title,
    //   description: listFormData.description,
    //   addedTasks: addedTasks.map((item) => ({
    //     title: item.title,
    //     description: item.description,

    //     priority: item.priority,
    //   })),
    // };
    const taskListData = {
      title: listFormData.title,
      description: listFormData.description,
      sections: sections.map((section) => ({
        title: section.title,
        description: section.description,
        tasks: section.tasks.map((item) => ({
          title: item.title,
          description: item.description,
          priority: item.priority,
          section: item.section,
        })),
      })),
    };

    console.log("taskListData", taskListData);

    try {
      const response = await axiosInstance
        .post("/tasklist-builder/", taskListData)
        .then((response) => {
          console.log(response.data);
          //   setErrors("");
          //   setFaqItems([]);
          //   setFormData(initialState);
        });
    } catch (error) {
      console.log(error.response.data);
      //   setApiErrors(error.response.data);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <form onSubmit={handleListSave}>
          <Grid container>
            <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
              <BaseContent
                header="Task List Builder"
                subheader="List Settings"
                justifyChildren="center"
              >
                <div style={{ marginTop: 0, marginBottom: 16, width: "100%" }}>
                  <Divider />
                </div>
                {listFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={field.md}
                      style={{ paddingRight: 12, width: "100%" }}
                    >
                      <Container
                        justify="flex-start"
                        style={{ width: "100%", padding: 0 }}
                      >
                        <Typography className={classes.helpText}>
                          {field.label}
                        </Typography>
                        <Text />
                        <FormField
                          required
                          multiline={field.multiline}
                          id={field.name}
                          onChange={handleListFormChange}
                          value={listFormData[field.name]}
                          minRows={4}
                        />
                      </Container>
                    </Grid>
                  );
                })}
                <div className={classes.buttonContainer}>
                  <SaveButton submitFunc={handleListSave} />
                </div>

                <div style={{ marginTop: 32, marginBottom: 0, width: "100%" }}>
                  <Typography variant="body2" className={classes.subheader}>
                    Section Entry
                  </Typography>
                </div>
                <div style={{ marginTop: 0, marginBottom: 16, width: "100%" }}>
                  <Divider />
                </div>

                {sectionFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={field.md}
                      style={{ paddingRight: 12, width: "100%" }}
                    >
                      <Container
                        justify="flex-start"
                        style={{ width: "100%", padding: 0 }}
                      >
                        <Typography className={classes.helpText}>
                          {field.label}
                        </Typography>
                        <Text />
                        <FormField
                          required
                          multiline={field.multiline}
                          id={field.name}
                          onChange={handleSectionFormChange}
                          value={sectionFormData[field.name]}
                          minRows={3}
                        />
                      </Container>
                    </Grid>
                  );
                })}
                <div className={classes.buttonContainer}>
                  <AddButton label="Section" addFunc={handleSectionAdd} />
                </div>
                <div style={{ marginTop: 32, marginBottom: 0, width: "100%" }}>
                  <Typography variant="body2" className={classes.subheader}>
                    Task Entry
                  </Typography>
                </div>
                <div style={{ marginTop: 0, marginBottom: 16, width: "100%" }}>
                  <Divider />
                </div>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingRight: 12, width: "100%" }}
                >
                  <Typography className={classes.helpText}>
                    Task Priority*
                  </Typography>
                  <Select
                    className={classes.select}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                      classes: {
                        paper: classes.menuPaper,
                      },
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                    variant="outlined"
                    name="priority"
                    value={taskFormData.priority}
                    onChange={handleTaskFormChange}
                  >
                    <MenuItem value="No Priority">None</MenuItem>
                    <MenuItem value="Low Priority">Low</MenuItem>
                    <MenuItem value="Medium Priority">Medium</MenuItem>
                    <MenuItem value="High Priority">High</MenuItem>
                  </Select>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingRight: 12, width: "100%" }}
                >
                  <Typography className={classes.helpText}>
                    Task Section*
                  </Typography>
                  <Select
                    className={classes.select}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                      classes: {
                        paper: classes.menuPaper,
                      },
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                    variant="outlined"
                    name="section"
                    value={taskFormData.section}
                    onChange={handleTaskFormChange}
                  >
                    {sections.map((section) => {
                      return (
                        <MenuItem value={section.title}>
                          {section.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                {taskFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={field.md}
                      style={{ paddingRight: 12, width: "100%" }}
                    >
                      <Container
                        justify="flex-start"
                        style={{ width: "100%", padding: 0 }}
                      >
                        <Typography className={classes.helpText}>
                          {field.label}
                        </Typography>
                        <Text />
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
                <div className={classes.buttonContainer}>
                  <AddButton label="Task" addFunc={handleTaskAdd} />
                </div>
              </BaseContent>
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
              {addedTasks.length > 0 ? (
                <BaseContent
                  header="Task List Preview"
                  justifyChildren="center"
                >
                  <TaskListExample data={addedTasks} />
                </BaseContent>
              ) : (
                <BaseContent
                  header="Task List Preview"
                  justifyChildren="center"
                >
                  <TaskListExample />
                </BaseContent>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default TaskListBuilder;
