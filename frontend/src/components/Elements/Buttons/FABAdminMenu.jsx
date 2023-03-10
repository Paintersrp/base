import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import ThemeSettings from "../Forms/ThemeSettings/ThemeSettings";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000,
    width: 56,
    height: 56,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    transition: "transform 0.2s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      transform: "scale(1.01)",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  fabExpanded: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000,
    width: 56,
    height: 56,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    transition: "transform 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    transform: "rotate(180deg)",
    "&:hover": {
      transform: "scale(1.01)",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      transform: "rotate(180deg)",
    },
  },
  menu: {
    position: "fixed",
    bottom: theme.spacing(11),
    right: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 999,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  menuItem: {
    fontSize: "1.5rem",
    width: 56,
    height: 56,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(1),

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
  arrow: {
    color: theme.palette.text.secondary,
  },
}));

const FABMenu = ({ editing, setEditing, handleUpdate, linkTo = "/admin" }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTransitionExited = () => {
    if (!expanded) {
      setExpanded(false);
    }
  };

  return (
    <div>
      <Slide
        direction="left"
        in={expanded}
        timeout={300}
        mountOnEnter
        unmountOnExit
        onExited={handleTransitionExited}
      >
        <div className={classes.menu}>
          <Tooltip
            title="Toggle Edit Mode"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              className={classes.menuItem}
              color="primary"
              onClick={() => setEditing(!editing)}
            >
              <ModeEditIcon style={{ fontSize: "1.75rem" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Admin Panel"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              className={classes.menuItem}
              color="primary"
              component={Link}
              to={{
                pathname: linkTo,
              }}
            >
              <AdminPanelSettingsIcon
                className={classes.iconSize}
                style={{ fontSize: "1.75rem" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="SEO Edit"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              className={classes.menuItem}
              color="primary"
              onClick={() => setEditing(!editing)}
            >
              <FindInPageIcon style={{ fontSize: "1.75rem" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Theme Settings"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <ThemeSettings handleUpdate={handleUpdate} classes={classes} />
          </Tooltip>
        </div>
      </Slide>
      <Tooltip
        title={expanded ? "Close" : "Menu"}
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <Fab
          aria-label="menu"
          className={expanded ? classes.fabExpanded : classes.fab}
          onClick={handleExpandClick}
        >
          <ChevronLeftIcon style={{ fontSize: "1.75rem" }} />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default FABMenu;
