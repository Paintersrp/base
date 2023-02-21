import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontFamily: "Roboto",
    fontSize: ".9rem",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
    color: theme.palette.primary.contrastText,
    minWidth: 65,
    textAlign: "center",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

const UpdateCancelButtonMenu = ({
  handleCancel,
  placement = "top",
  position = "end",
}) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: position }}>
      <Tooltip
        title="Update"
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        arrow
        placement={placement}
      >
        <IconButton type="submit" aria-label="Update">
          <Check color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Cancel"
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        arrow
        placement={placement}
      >
        <IconButton aria-label="Cancel" onClick={handleCancel}>
          <Clear color="primary" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default UpdateCancelButtonMenu;
