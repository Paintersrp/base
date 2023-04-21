import React from "react";
import {
  List,
  Divider,
  Typography,
  Paper,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

import Flexer from "../../../../Elements/Layout/Container/Flexer";

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
  addButton: {
    color: theme.palette.info.light,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
}));

function TaskListSectionEmpty({ handleAddTaskClick }) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-label="task list"
      style={{ padding: 0 }}
      dense={true}
    >
      <div key="no-sections">
        <Paper className={classes.sectionHeader} square>
          <div>
            <Typography align="center" variant="subtitle1">
              No Sections Available
            </Typography>
          </div>
        </Paper>
        <Flexer j="c" mt={8} mb={8}>
          <IconButton
            className={classes.addButton}
            size="small"
            onClick={handleAddTaskClick}
          >
            <AddCircleOutline />
          </IconButton>
        </Flexer>
        <Divider />
      </div>
    </List>
  );
}

export default TaskListSectionEmpty;
