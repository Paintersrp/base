import React, { useEffect, useState } from "react";
import {
  List,
  Divider,
  Typography,
  Paper,
  Collapse,
  makeStyles,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AddCircleOutline } from "@material-ui/icons";

import Flexer from "../../../../Elements/Layout/Container/Flexer";
import MoreMenu from "../../../Parts/Menus/MoreMenu";

import TaskListTaskForm from "../TaskForm/TaskListTaskForm";
import TaskListSectionProgress from "../SectionProgress/TaskListSectionProgress";
import TaskListTasksEmpty from "../TaskEmpty/TaskListTaskEmpty";
import TaskListSectionEmpty from "../SectionEmpty/TaskListSectionEmpty";
import TaskListBodyTask from "../BodyTask/TaskListBodyTask";

import { handleNestedDataChange } from "../../../../../utils/dataHandlers/dataHandlers";
import { filterState } from "../../../../../utils/dataHandlers/filterHandlers";
import DeleteConfirmationModal from "../../../../Elements/Modals/DeleteConfirmationModal";
import TaskListSectionForm from "../SectionForm/TaskListSectionForm";
import { validateSectionAdd } from "../../utils/taskListValidation";

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2, 1, 0.5),
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
    margin: theme.spacing(0.5, 1, 0.35, 0),
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
  moreButton: {
    color: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
  dragInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.info.light,
    marginRight: 4,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

function TaskListBody({
  taskFormData,
  setTaskFormData,
  handleTaskAdd,
  sections,
  setSections,
  setCompletedTasks,
  completedTasks,
  taskErrors,
  setTaskErrors,
  filterItems,
  handleListSave,
  handleAddTaskClick,
}) {
  const classes = useStyles();
  const [sectionData, setSectionData] = useState(sections);
  const [selected, setSelected] = useState(false);
  const [ready, setReady] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addOpen, setAddOpen] = useState([]);
  const [editOpen, setEditOpen] = useState([]);
  const [editSectionOpen, setEditSectionOpen] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [editSectionFormData, setEditSectionFormData] = useState({});
  const [editSectionErrors, setEditSectionErrors] = useState({});
  const [openCategory, setOpenCategory] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [keepOpen, setKeepOpen] = useState(false);
  const [anchorEls, setAnchorEls] = useState(Array(sections.length).fill(null));

  useEffect(() => {
    console.log("reran");
    setSectionData(sections);
    setReady(false);
    const initialEditFormData = {};
    const initialEditSectionFormData = {};
    sections.forEach((section) => {
      initialEditFormData[section.title] = {
        title: "",
        description: "",
        priority: "",
        section: section.title,
      };
      initialEditSectionFormData[section.title] = {
        title: "",
        description: "",
      };
    });
    setEditFormData(initialEditFormData);
    setEditSectionFormData(initialEditSectionFormData);
    setReady(true);
  }, [sections]);

  const handleClick = (event, index) => {
    event.stopPropagation();
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleToggle = (event, taskId, sectionName) => {
    event.stopPropagation();
    const sectionIndex = sections.findIndex(
      (section) => section.title === sectionName
    );
    const taskIndex = sections[sectionIndex].tasks.findIndex(
      (item) => item.id === taskId
    );
    const updatedTask = {
      ...sections[sectionIndex].tasks[taskIndex],
      status: completedTasks.includes(taskId) ? "Incomplete" : "Complete",
    };

    const updatedTasks = [...sections[sectionIndex].tasks];
    updatedTasks[taskIndex] = updatedTask;

    const updatedSection = {
      ...sections[sectionIndex],
      tasks: updatedTasks,
    };

    const updatedSections = [...sections];
    updatedSections[sectionIndex] = updatedSection;
    setSections(updatedSections);

    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }

    setTimeout(() => {
      handleListSave(updatedSections);
    }, 250);
  };

  const getTaskCountByCategory = (category) => {
    const sectionIndex = sectionData.findIndex(
      (section) => section.title === category
    );
    const tasksInCategory = sectionData[sectionIndex].tasks;
    const incompleteTasks = tasksInCategory.filter(
      (item) => !completedTasks.includes(item.id || item.index)
    );
    return incompleteTasks.length;
  };

  const getProgressByCategory = (category) => {
    const sectionIndex = sectionData.findIndex(
      (section) => section.title === category
    );
    const tasksInCategory = sectionData[sectionIndex].tasks;

    if (!tasksInCategory.length > 0) {
      return 0;
    }

    const totalTasks = tasksInCategory.length;
    const completed = tasksInCategory.filter((item) =>
      completedTasks.includes(item.id)
    );
    const numCompletedTasks = completed.length;
    const percentage = (numCompletedTasks / totalTasks) * 100;
    const roundedPercentage = percentage.toFixed(2);
    return roundedPercentage;
  };

  const handleEditClick = (category, item) => {
    let remainOpen = true;
    setEditFormData((prev) => {
      const isSameItemData =
        prev[category] &&
        prev[category].title === item.title &&
        prev[category].description === item.description &&
        prev[category].priority === item.priority;
      if (editOpen.includes(category)) {
        if (isSameItemData) {
          remainOpen = false;
          return prev;
        } else {
          return {
            ...prev,
            [category]: {
              title: item.title,
              description: item.description,
              priority: item.priority,
              section: category,
              id: item.id,
              oldSectionName: prev[category].oldSectionName,
            },
          };
        }
      } else {
        return {
          ...prev,
          [category]: {
            title: item.title,
            description: item.description,
            priority: item.priority,
            section: category,
            id: item.id,
            oldSectionName: category,
          },
        };
      }
    });

    setEditOpen((prev) => {
      if (prev.includes(category) && !remainOpen) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleDeleteClick = (sectionName, taskId) => {
    const sectionIndex = sections.findIndex(
      (section) => section.title === sectionName
    );
    const taskIndex = sections[sectionIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    const updatedTasks = [
      ...sections[sectionIndex].tasks.slice(0, taskIndex),
      ...sections[sectionIndex].tasks.slice(taskIndex + 1),
    ];
    const updatedSection = {
      ...sections[sectionIndex],
      tasks: updatedTasks,
    };
    const updatedSections = [
      ...sections.slice(0, sectionIndex),
      updatedSection,
      ...sections.slice(sectionIndex + 1),
    ];
    setSections(updatedSections);
    setTimeout(() => {
      handleListSave(updatedSections);
    }, 250);
  };

  const handleEditSave = (event, sectionName) => {
    event.preventDefault();
    const oldSectionName = editFormData[sectionName].oldSectionName;
    const newSectionName = editFormData[sectionName].section;
    const taskID = editFormData[sectionName].id;

    const oldSectionIndex = sections.findIndex(
      (section) => section.title === oldSectionName
    );
    const newSectionIndex = sections.findIndex(
      (section) => section.title === newSectionName
    );
    const taskIndex = sections[oldSectionIndex].tasks.findIndex(
      (item) => item.id === taskID
    );

    const updatedTask = {
      ...sections[oldSectionIndex].tasks[taskIndex],
      title: editFormData[sectionName].title,
      description: editFormData[sectionName].description,
      priority: editFormData[sectionName].priority,
    };

    const oldTasks = [...sections[oldSectionIndex].tasks];
    oldTasks.splice(taskIndex, 1);
    const newTasks = [...sections[newSectionIndex].tasks];

    if (oldSectionName === newSectionName) {
      newTasks[taskIndex] = updatedTask;
    } else {
      newTasks.push(updatedTask);
    }

    const updatedOldSection = {
      ...sections[oldSectionIndex],
      tasks: oldTasks,
    };
    const updatedNewSection = {
      ...sections[newSectionIndex],
      tasks: newTasks,
    };

    const updatedSections = [...sections];
    updatedSections[oldSectionIndex] = updatedOldSection;
    updatedSections[newSectionIndex] = updatedNewSection;
    setSections(updatedSections);

    setEditFormData((prev) => {
      const updatedFormData = { ...prev };
      updatedFormData[sectionName] = {
        title: "",
        description: "",
        priority: "",
        section: newSectionName,
        oldSectionName: newSectionName,
        id: "",
      };
      return updatedFormData;
    });

    setEditOpen((prev) => prev.filter((c) => c !== sectionName));
    setTimeout(() => {
      handleListSave(updatedSections);
    }, 250);
  };

  const handleAddClick = (event, category) => {
    console.log("category", category);
    const cont = handleTaskAdd(category);
    console.log("cont", cont, category);
    if (!keepOpen && cont) {
      filterState(event, category, addOpen, setAddOpen);
    }
  };
  const handleKeepOpen = () => {
    setKeepOpen(!keepOpen);
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, newIndex) => {
    e.preventDefault();

    if (newIndex !== draggedItemIndex) {
      const newSections = [...sections];
      const draggedItem = newSections.splice(draggedItemIndex, 1)[0];
      newSections.splice(newIndex, 0, draggedItem);
      newSections.forEach((section, i) => {
        section.tasks.forEach((task, j) => {
          if (i === draggedItemIndex) {
            task.index = j;
          } else if (i === newIndex) {
            task.index = j + 1;
          }
        });
      });

      setSections(newSections);
      setDraggedItemIndex(newIndex);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteSection(selected);
    handleConfirmClose();
  };

  const handleDelete = (item) => {
    handleConfirmOpen();
    setSelected(item);
  };

  const handleDeleteSection = (sectionName) => {
    const sectionIndex = sections.findIndex(
      (section) => section.title === sectionName
    );
    const updatedSections = [
      ...sections.slice(0, sectionIndex),
      ...sections.slice(sectionIndex + 1),
    ];
    setSections(updatedSections);
    setTimeout(() => {
      handleListSave(updatedSections);
      handleClose();
    }, 250);
  };

  const handleSectionEdit = (e, sectionName) => {
    e.stopPropagation();
    const sectionToEdit = sections.find(
      (section) => section.title === sectionName
    );
    setEditSectionFormData({
      ...editSectionFormData,
      [sectionName]: {
        title: sectionToEdit.title,
        description: sectionToEdit.description,
      },
    });
    filterState(e, sectionName, editSectionOpen, setEditSectionOpen);
  };

  const handleSectionEditSave = (event, sectionName) => {
    event.preventDefault();

    let errors = validateSectionAdd(editSectionFormData[sectionName], sections);

    setEditSectionErrors((prevErrors) => ({
      ...prevErrors,
      [sectionName]: errors,
    }));

    if (errors.length > 0) {
      return false;
    }

    const newSectionTitle = editSectionFormData[sectionName].title;
    const newSectionDescription = editSectionFormData[sectionName].description;
    const sectionIndex = sections.findIndex(
      (section) => section.title === sectionName
    );
    const oldTitle = sections[sectionIndex].title;

    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        title: newSectionTitle,
        description: newSectionDescription,
      };
      const updatedSections = [
        ...sections.slice(0, sectionIndex),
        updatedSection,
        ...sections.slice(sectionIndex + 1),
      ];
      setEditSectionFormData({
        ...editSectionFormData,
        [newSectionTitle]: {
          title: "",
          description: "",
        },
      });
      setSections(updatedSections);
    }

    filterState(event, oldTitle, editSectionOpen, setEditSectionOpen);
    filterState(event, sectionName, editSectionOpen, setEditSectionOpen);
  };

  if (!ready) {
    return null;
  }

  return (
    <React.Fragment>
      {sections.length > 0 ? (
        <List
          component="nav"
          aria-label="task list"
          style={{ padding: 0 }}
          dense={true}
        >
          {sectionData.map((category, index) => {
            return (
              <div key={category.title}>
                <Paper
                  className={classes.sectionHeader}
                  square
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) =>
                    filterState(
                      e,
                      category.title,
                      openCategory,
                      setOpenCategory
                    )
                  }
                  style={{
                    opacity: index === draggedItemIndex ? 0.7 : 1,
                    borderBottom:
                      index === draggedItemIndex ? "3px solid #64b5f6" : null,
                  }}
                >
                  <div className={classes.categoryTitle}>
                    <Flexer j="fs">
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={classes.dragInner}
                      >
                        <DragIndicatorIcon />
                      </div>

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
                      <Tooltip
                        title={`Add Task to ${category.title}`}
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          className={classes.addButton}
                          size="small"
                          onClick={(e) =>
                            filterState(e, category.title, addOpen, setAddOpen)
                          }
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={`${category.title} Section Options`}
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          disableRipple
                          className={classes.moreButton}
                          size="small"
                          onClick={(event) => handleClick(event, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                      <MoreMenu
                        anchorEl={anchorEls[index]}
                        handleClose={() => handleClose(index)}
                        menuOptions={[
                          {
                            primary: "Edit Section",
                            click: (e) =>
                              handleSectionEdit(
                                e,
                                category.title,
                                handleClose(index)
                              ),
                          },
                          {
                            primary: "Delete Section",
                            click: () => handleDelete(category.title),
                          },
                        ]}
                      />
                    </Flexer>
                  </div>
                </Paper>

                {index === draggedItemIndex ? null : (
                  <Divider variant="inset" />
                )}

                <TaskListSectionForm
                  label="Edit"
                  handleSectionFormChange={(e) =>
                    handleNestedDataChange(
                      e,
                      setEditSectionFormData,
                      editSectionFormData,
                      category.title
                    )
                  }
                  setSectionFormData={setEditSectionFormData}
                  sectionFormData={editSectionFormData[category.title]}
                  addOpen={editSectionOpen.includes(category.title)}
                  handleSectionAdd={(event) =>
                    handleSectionEditSave(event, category.title)
                  }
                  setAddOpen={(e) =>
                    filterState(
                      e,
                      category.title,
                      editSectionOpen,
                      setEditSectionOpen
                    )
                  }
                  errors={editSectionErrors}
                  setErrors={setEditSectionErrors}
                  nested={category.title}
                />

                {index === draggedItemIndex ? null : <Divider />}

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
                      if (filterItems) {
                        if (item.status === "Complete") {
                          return null;
                        }
                      }
                      return (
                        <React.Fragment key={item.id}>
                          <TaskListBodyTask
                            item={item}
                            handleToggle={handleToggle}
                            completedTasks={completedTasks}
                            section={category.title}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                          />

                          <Divider />
                        </React.Fragment>
                      );
                    })}
                </Collapse>

                {category.tasks.length > 0 ? (
                  <TaskListSectionProgress
                    openCategory={openCategory}
                    category={category}
                    getProgressByCategory={getProgressByCategory}
                  />
                ) : (
                  <TaskListTasksEmpty
                    open={true}
                    category={category}
                    handleOpen={(e) =>
                      filterState(e, category.title, addOpen, setAddOpen)
                    }
                  />
                )}
                {filterItems &&
                  getTaskCountByCategory(category.title) === 0 &&
                  category.tasks.length > 0 && (
                    <TaskListTasksEmpty
                      label="No Incomplete Tasks In Section"
                      open={openCategory.includes(category.title)}
                      category={category}
                      handleOpen={(e) =>
                        filterState(e, category.title, addOpen, setAddOpen)
                      }
                    />
                  )}

                <TaskListTaskForm
                  key={category.title}
                  dataChange={(e) =>
                    handleNestedDataChange(
                      e,
                      setTaskFormData,
                      taskFormData,
                      category.title
                    )
                  }
                  handleCancel={(e) =>
                    filterState(e, category.title, addOpen, setAddOpen)
                  }
                  taskFormData={taskFormData[category.title]}
                  addOpen={addOpen.includes(category.title)}
                  handleTaskAdd={(event) =>
                    handleAddClick(event, category.title)
                  }
                  sections={sections}
                  errors={taskErrors}
                  setErrors={setTaskErrors}
                  keepOpen={keepOpen}
                  handleKeepOpen={handleKeepOpen}
                />
                <TaskListTaskForm
                  label="Edit"
                  key={`${category.title}-edit`}
                  dataChange={(e) =>
                    handleNestedDataChange(
                      e,
                      setEditFormData,
                      editFormData,
                      category.title
                    )
                  }
                  handleCancel={(e) =>
                    filterState(e, category.title, editOpen, setEditOpen)
                  }
                  taskFormData={editFormData[category.title]}
                  addOpen={editOpen.includes(category.title)}
                  handleTaskAdd={(event) =>
                    handleEditSave(event, category.title)
                  }
                  sections={sections}
                  errors={taskErrors}
                  setErrors={setTaskErrors}
                />
              </div>
            );
          })}
        </List>
      ) : (
        <TaskListSectionEmpty handleAddTaskClick={handleAddTaskClick} />
      )}
      <DeleteConfirmationModal
        open={confirmOpen}
        handleClose={handleConfirmClose}
        handleConfirmDelete={handleConfirmDelete}
        message={"Are you sure you want to delete this?"}
        subMessage="Deleting this section will delete all the tasks within it."
      />
    </React.Fragment>
  );
}

export default TaskListBody;
