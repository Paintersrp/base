import React from "react";
import {
  Divider,
  Collapse,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import RuleIcon from "@mui/icons-material/Rule";
import ChecklistRtl from "@mui/icons-material/ChecklistRtl";

import Flexer from "../../../../Elements/Layout/Container/Flexer";
import Text from "../../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  regBar: {
    "& .MuiLinearProgress-bar": {
      backgroundColor: theme.palette.info.light,
    },
  },
  lowBar: {
    "& .MuiLinearProgress-bar": {
      backgroundColor: theme.palette.error.light,
    },
  },
  highBar: {
    "& .MuiLinearProgress-bar": {
      backgroundColor: theme.palette.success.light,
    },
  },
  regProgressIcon: {
    color: theme.palette.info.light,
  },
  lowProgressIcon: {
    color: theme.palette.error.light,
  },
  highProgressIcon: {
    color: theme.palette.success.light,
  },
}));

function TaskListSectionProgress({
  openCategory,
  category,
  getProgressByCategory,
}) {
  const classes = useStyles();

  return (
    <Collapse in={!openCategory.includes(category.title)} timeout={250}>
      <Flexer j="c" mt={10} mb={10}>
        {getProgressByCategory(category.title) >= 80 ? (
          <ChecklistRtl className={classes.highProgressIcon} />
        ) : getProgressByCategory(category.title) <= 25 ? (
          <RuleIcon className={classes.lowProgressIcon} />
        ) : (
          <RuleIcon className={classes.regProgressIcon} />
        )}
        <Flexer a="c" fd="column" w={250} style={{ marginLeft: 8 }}>
          <Flexer j="sb" w={250}>
            <Text a="c" style={{ marginRight: 8 }}>
              Progress:
            </Text>
            <Text>{getProgressByCategory(category.title)}%</Text>
          </Flexer>
          <Flexer j="c" mb={8} mt={2} w={250}>
            <div style={{ width: 250 }}>
              <LinearProgress
                variant="determinate"
                value={getProgressByCategory(category.title)}
                style={{
                  height: 10,
                  borderRadius: 3,
                }}
                className={
                  getProgressByCategory(category.title) >= 80
                    ? classes.highBar
                    : getProgressByCategory(category.title) <= 25
                    ? classes.lowBar
                    : classes.regBar
                }
              />
            </div>
          </Flexer>
        </Flexer>
      </Flexer>
      <Divider />
    </Collapse>
  );
}

export default TaskListSectionProgress;
