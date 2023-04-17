import React from "react";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  addButton: {
    color: theme.palette.success.light,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.background.default,
    },
  },
  cancelButton: {
    color: theme.palette.error.main,
    marginRight: 2,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.default,
    },
  },
}));

export default function ConfirmCancelButtons({
  confirmFunc,
  confirmTooltip = "Confirm",
  cancelFunc,
  cancelTooltip = "Cancel",
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Tooltip
        title={confirmTooltip}
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          className={classes.addButton}
          size="small"
          onClick={confirmFunc}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={cancelTooltip}
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          className={classes.cancelButton}
          size="small"
          onClick={cancelFunc}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
