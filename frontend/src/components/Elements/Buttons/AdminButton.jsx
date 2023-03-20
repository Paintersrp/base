import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const AdminButton = ({
  link,
  tooltipText,
  size = "small",
  placement = "bottom",
}) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={`${tooltipText} Admin Panel`}
      classes={{
        tooltip: classes.tooltip,
      }}
      placement={placement}
    >
      <Link to={`/admin/${link}`}>
        <IconButton size={size} color="primary">
          <AdminPanelSettingsIcon style={{ color: "primary" }} />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default AdminButton;
