import React from "react";
import { Divider, Collapse, makeStyles, IconButton } from "@material-ui/core";
import Flexer from "../../Elements/Layout/Container/Flexer";
import Text from "../../Elements/Layout/Text/Text";
import { AddCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  addButton: {
    color: theme.palette.info.light,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.background.default,
    },
  },
}));

function TaskListTasksEmpty({
  open,
  category,
  handleAddOpen,
  label = "No Tasks In Section",
}) {
  const classes = useStyles();

  return (
    <Collapse in={open} timeout={250}>
      <Flexer j="c" mt={8} mb={8}>
        <Flexer a="c" fd="column" w={250} style={{ marginLeft: 8 }}>
          <Flexer j="c" w={250}>
            <Text a="c" t="body1" style={{ marginRight: 8 }}>
              {label}
            </Text>
          </Flexer>
          <IconButton
            className={classes.addButton}
            size="small"
            onClick={(event) => handleAddOpen(event, category.title)}
          >
            <AddCircleOutline />
          </IconButton>
        </Flexer>
      </Flexer>
      <Divider />
    </Collapse>
  );
}

export default TaskListTasksEmpty;
