import React from "react";
import { Tooltip, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const EditDeleteButtonMenu = ({
  hideDelete = false,
  position = "flex-end",
  placement = "top",
  editClick,
  deleteClick,
  finalColor = "primary",
}) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: position,
      }}
    >
      <Tooltip
        title="Edit"
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        arrow
        placement={placement}
      >
        <IconButton
          size="small"
          color="primary"
          style={{ marginRight: 5, marginBottom: 5 }}
          onClick={editClick}
          classes={{ label: classes.label }}
        >
          <EditIcon style={{ color: finalColor }} />
        </IconButton>
      </Tooltip>
      {!hideDelete ? (
        <Tooltip
          title="Delete"
          classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow,
          }}
          arrow
          placement={placement}
        >
          <IconButton
            style={{ marginRight: 5, marginBottom: 5 }}
            size="small"
            color="primary"
            label="delete"
            aria-label="Delete"
            onClick={deleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default EditDeleteButtonMenu;
