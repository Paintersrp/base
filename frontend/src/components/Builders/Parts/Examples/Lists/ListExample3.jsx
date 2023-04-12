import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import { taskExampleData } from "./listExampleData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listHeader: {
    fontWeight: "bold",
  },
  listSubtitle: {
    fontStyle: "italic",
  },
  completedTask: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
}));

function ListExample3() {
  const classes = useStyles();
  const [completedTasks, setCompletedTasks] = useState([]);

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

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {taskExampleData.map((item) => (
          <div key={item.id}>
            <ListItem button>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Checkbox
                      checked={isTaskCompleted(item.id)}
                      onChange={() => handleToggle(item.id)}
                    />
                    <span className={getTaskClasses(item.id)}>
                      {item.title}
                    </span>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <span className={classes.listHeader}>{item.subtitle}</span>
                    <br />
                    <span
                      className={`${classes.listSubtitle} ${getTaskClasses(
                        item.id
                      )}`}
                    >
                      {item.description}
                    </span>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <span className={getTaskClasses(item.id)}>
                  {isTaskCompleted(item.id) ? "Completed" : "Incomplete"}
                </span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ListExample3;
