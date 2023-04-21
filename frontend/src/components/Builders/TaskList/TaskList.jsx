import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import ErrorMessage from "../../Elements/Errors/ErrorMessage";

import TaskListBody from "./components/Body/TaskListBody";
import TaskListSectionForm from "./components/SectionForm/TaskListSectionForm";
import TaskListDetailsForm from "./components/DetailsForm/TaskListDetailsForm";
import TaskListBottomBar from "./components/BottomBar/TaskListBottomBar";

import {
  validateListSave,
  validateSectionAdd,
  validateTaskAdd,
} from "./utils/taskListValidation";
import {
  handleDataChange,
  toggleSwapStates,
} from "../../../utils/dataHandlers/dataHandlers";

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

function TaskList({ list, handleListUpdate }) {
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
    description: list ? (list.description ? list.description : "") : "",
  });
  const [sectionFormData, setSectionFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setListFormData({
      title: list ? list.title : "",
      description: list ? (list.description ? list.description : "") : "",
    });
  }, [list]);

  useEffect(() => {
    setReady(false);
    const orderedSections = list.sections.sort((a, b) => a.order - b.order);
    setSections(orderedSections);
    const initialTaskFormData = {};
    const completedTasksArr = [];

    list.sections.forEach((section, index) => {
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

  useEffect(() => {
    const initialTaskFormData = {};
    const completedTasksArr = [];

    sections.forEach((section, index) => {
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
  }, [sections]);

  const handleListSave = async (sectionsData) => {
    const taskListData = {
      title: listFormData.title,
      description: listFormData.description,
      sections: sectionsData.map((section, index) => ({
        title: section.title,
        description: section.description,
        order: index,
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
          console.log("Data Received: ", response.data);
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
      order: sections.length - 1,
      tasks: [],
    };

    let errors = validateSectionAdd(newSection, sections);
    setSectionErrors(errors);
    if (errors.length > 0) {
      return;
    }

    setSections([...sections, newSection]);

    const updatedTaskFormData = { ...taskFormData };
    updatedTaskFormData[newSection.title] = {
      title: "",
      description: "",
      priority: "",
      section: newSection.title,
    };
    setTaskFormData(updatedTaskFormData);
    setSectionFormData({
      title: "",
      description: "",
    });
    setTimeout(() => {
      setAddOpen(false);
      handleListSave([...sections, newSection]);
    }, 250);
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
      return false;
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
    setTimeout(() => {
      handleListSave(updatedSections);
    }, 250);

    return true;
  };

  if (!ready) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TaskListBody
          taskFormData={taskFormData}
          setTaskFormData={setTaskFormData}
          handleTaskAdd={handleTaskAdd}
          sections={sections}
          setSections={setSections}
          setCompletedTasks={setCompletedTasks}
          completedTasks={completedTasks}
          taskErrors={taskErrors}
          setTaskErrors={setTaskErrors}
          filterItems={filterItems}
          handleListSave={handleListSave}
          handleAddTaskClick={() =>
            toggleSwapStates(setAddOpen, addOpen, setEditOpen, editOpen)
          }
        />
        <TaskListBottomBar
          filterItems={filterItems}
          setFilterItems={setFilterItems}
          handleEditListClick={() =>
            toggleSwapStates(setEditOpen, editOpen, setAddOpen, addOpen)
          }
          handleAddTaskClick={() =>
            toggleSwapStates(setAddOpen, addOpen, setEditOpen, editOpen)
          }
          handleListSave={handleListSave}
          sections={sections}
        />
        <TaskListDetailsForm
          listFormData={listFormData}
          setListFormData={setListFormData}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
        <TaskListSectionForm
          handleSectionFormChange={(e) =>
            handleDataChange(e, setSectionFormData, sectionFormData)
          }
          setSectionFormData={setSectionFormData}
          sectionFormData={sectionFormData}
          addOpen={addOpen}
          handleSectionAdd={handleSectionAdd}
          setAddOpen={setAddOpen}
          errors={sectionErrors}
          setErrors={setSectionErrors}
        />

        {saveErrors && (
          <div>
            <ErrorMessage errors={saveErrors} setErrors={setSaveErrors} />
          </div>
        )}
        {apiErrors && (
          <div>
            <ErrorMessage errors={apiErrors} setErrors={setApiErrors} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default TaskList;
