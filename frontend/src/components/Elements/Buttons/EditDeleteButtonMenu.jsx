import React from "react";
import { Tooltip, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

const EditDeleteButtonMenu = ({
  hideDelete = false,
  position = "flex-end",
  placement = "bottom",
  editClick,
  deleteClick,
  finalColor = "primary",
  adminLink,
  text = "",
  obj = null,
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
        title={obj ? `Edit ${text} Object: ${obj}` : `Edit ${text}`}
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
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
          title={obj ? `Delete ${text} Object: ${obj}` : `Delete ${text}`}
          classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow,
          }}
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
      {adminLink ? (
        <Tooltip
          title={`${text} Admin Panel`}
          classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow,
          }}
          placement={placement}
        >
          <Link to={`/admin/${adminLink}`}>
            <IconButton
              style={{ marginRight: 5, marginBottom: 5 }}
              size="small"
              color="primary"
              label="delete"
              aria-label="Delete"
              onClick={deleteClick}
            >
              <AdminPanelSettingsIcon style={{ color: finalColor }} />
            </IconButton>
          </Link>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default EditDeleteButtonMenu;
