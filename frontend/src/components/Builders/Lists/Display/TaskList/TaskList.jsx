import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axiosInstance from "../../../../../lib/Axios/axiosInstance";
import TaskListBody from "./TaskListBody";
import TaskListSectionForm from "./TaskListSectionForm";
import TaskListDetailsForm from "./TaskListDetailsForm";
import {
  validateListSave,
  validateSectionAdd,
  validateTaskAdd,
} from "./TaskListValidation";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import TaskListBottomBar from "./TaskListBottomBar";

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
}));

function TaskList({ data, list, handleListUpdate }) {
  const classes = useStyles();
  const [sectionErrors, setSectionErrors] = useState("");
  const [taskErrors, setTaskErrors] = useState({});
  const [saveErrors, setSaveErrors] = useState("");
  const [apiErrors, setApiErrors] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [filterItems, setFilterItems] = useState(false);
  const [sections, setSections] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskFormData, setTaskFormData] = useState({});
  const [listFormData, setListFormData] = useState({
    title: list ? list.title : "",
    description: list ? list.description : "",
  });
  const [sectionFormData, setSectionFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setListFormData({
        title: list ? list.title : "",
        description: list ? list.description : "",
      });
    }
  }, [data, list]);

  useEffect(() => {
    setReady(false);
    setSections(list.sections);
    const initialTaskFormData = {};
    const completedTasksArr = [];

    list.sections.forEach((section) => {
      initialTaskFormData[section.title] = {
        title: "",
        description: "",
        priority: "",
        section: section.title,
      };

      section.tasks.forEach((task) => {
        if (task.status === "Complete") {
          completedTasksArr.push(task.id);
        }
      });
    });
    setTaskFormData(initialTaskFormData);
    setCompletedTasks(completedTasksArr);
    setReady(true);
  }, [list]);

  const handleClearSectionErrors = (index) => {
    const updatedSectionErrors = [...sectionErrors];
    updatedSectionErrors.splice(index, 1);
    setSectionErrors(updatedSectionErrors);
  };

  const handleClearSaveErrors = (index) => {
    const updatedSectionErrors = [...sectionErrors];
    updatedSectionErrors.splice(index, 1);
    setSectionErrors(updatedSectionErrors);
  };

  const handleClearApiErrors = (index) => {
    const updatedSectionErrors = [...apiErrors];
    updatedSectionErrors.splice(index, 1);
    setApiErrors(updatedSectionErrors);
  };

  const handleClearTaskErrors = (sectionName, index) => {
    setTaskErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      const sectionErrors = [...prevErrors[sectionName]];
      sectionErrors.splice(index, 1);
      updatedErrors[sectionName] = sectionErrors;
      return updatedErrors;
    });
  };

  const handleAddTaskClick = () => {
    setAddOpen(!addOpen);
    if (editOpen) {
      setEditOpen(!editOpen);
    }
  };
  const handleEditListClick = () => {
    setEditOpen(!editOpen);
    if (addOpen) {
      setAddOpen(!addOpen);
    }
  };
  const handleFilterItems = () => {
    setFilterItems(!filterItems);
  };

  const handleTaskFormChange = (event, sectionName) => {
    setTaskFormData({
      ...taskFormData,
      [sectionName]: {
        ...taskFormData[sectionName],
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSectionFormChange = (event) => {
    setSectionFormData({
      ...sectionFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleListSave = async (event) => {
    const taskListData = {
      title: listFormData.title,
      description: listFormData.description,
      sections: sections.map((section) => ({
        title: section.title,
        description: section.description,
        tasks: section.tasks.map((item) => {
          const status = completedTasks.includes(item.id || item.index)
            ? "Complete"
            : "Incomplete";
          return {
            id: item.id || null,
            title: item.title,
            description: item.description,
            priority: item.priority,
            section: section.title,
            status: status,
          };
        }),
      })),
    };

    let errors = validateListSave(listFormData, sections);
    setSaveErrors(errors);
    if (errors.length > 0) {
      return;
    }

    console.log("Data Sent: ", taskListData);

    try {
      const response = await axiosInstance
        .put(`/tasklist/${list.id}/`, taskListData)
        .then((response) => {
          handleListUpdate(list.id, response.data);
          setApiErrors("");
        });
    } catch (error) {
      setApiErrors(error.response.data);
    }
  };

  const handleSectionAdd = () => {
    setSectionErrors("");
    const newSection = {
      title: sectionFormData.title,
      description: sectionFormData.description,
      tasks: [],
    };

    let errors = validateSectionAdd(newSection, sections);
    setSectionErrors(errors);
    if (errors.length > 0) {
      return;
    }

    setSections([...sections, newSection]);
    setSectionFormData({
      title: "",
      description: "",
    });
  };

  const handleTaskAdd = (sectionName) => {
    setTaskErrors((prevErrors) => ({
      ...prevErrors,
      [sectionName]: "",
    }));

    let errors = validateTaskAdd(
      taskFormData[sectionName],
      sectionName,
      sections
    );
    setTaskErrors((prevErrors) => ({
      ...prevErrors,
      [sectionName]: errors,
    }));
    if (errors.length > 0) {
      return;
    }

    const sectionIndex = sections.findIndex(
      (section) => section.title === sectionName
    );
    const tasks = sections[sectionIndex].tasks;
    const newTaskIndex = tasks.length > 0 ? tasks.length + 1 : 1;
    const updatedTaskFormData = {
      ...taskFormData[sectionName],
      index: newTaskIndex,
    };
    const updatedSection = {
      ...sections[sectionIndex],
      tasks: [...sections[sectionIndex].tasks, updatedTaskFormData],
    };
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = updatedSection;

    setSections(updatedSections);
    setTaskFormData({
      ...taskFormData,
      [sectionName]: {
        title: "",
        description: "",
        priority: "",
        section: sectionName,
      },
    });
  };

  if (!ready) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TaskListBody
          handleTaskFormChange={handleTaskFormChange}
          taskFormData={taskFormData}
          handleAddTaskClick={handleAddTaskClick}
          handleTaskAdd={handleTaskAdd}
          sections={sections}
          handleListUpdate={handleListUpdate}
          setCompletedTasks={setCompletedTasks}
          completedTasks={completedTasks}
          taskErrors={taskErrors}
          handleErrors={handleClearTaskErrors}
          filterItems={filterItems}
        />
        <TaskListBottomBar
          filterItems={filterItems}
          handleEditListClick={handleEditListClick}
          handleAddTaskClick={handleAddTaskClick}
          handleFilterItems={handleFilterItems}
          handleListSave={handleListSave}
        />
        <TaskListDetailsForm
          listFormData={listFormData}
          setListFormData={setListFormData}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
        <TaskListSectionForm
          handleSectionFormChange={handleSectionFormChange}
          setSectionFormData={setSectionFormData}
          sectionFormData={sectionFormData}
          addOpen={addOpen}
          handleSectionAdd={handleSectionAdd}
          setAddOpen={setAddOpen}
          errors={sectionErrors}
          handleErrors={handleClearSectionErrors}
        />
        {saveErrors && (
          <div>
            <ErrorMessage
              errors={saveErrors}
              clearFunc={handleClearSaveErrors}
            />
          </div>
        )}
        {apiErrors && (
          <div>
            <ErrorMessage errors={apiErrors} clearFunc={handleClearApiErrors} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default TaskList;
