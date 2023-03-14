import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import EditOffSharpIcon from "@mui/icons-material/EditOffSharp";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import ThemeSettings from "../Forms/ThemeSettings/ThemeSettings";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(3),
    zIndex: 1000,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    transition: "transform 0.5s ease-in-out",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  fabExpanded: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(3),
    zIndex: 1000,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    transition: "transform 0.5s ease-in-out",
    boxShadow: "none !important",
    transform: "rotate(270deg)",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      transform: "rotate(270deg)",
    },
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  menu: {
    position: "fixed",
    bottom: theme.spacing(9),
    right: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 999,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(7),
      right: theme.spacing(1),
    },
  },
  menuItem: {
    fontSize: "1.5rem",
    width: 40,
    height: 40,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
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
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTransitionExited = () => {
    if (!expanded) {
      setExpanded(false);
    }
  };

  return (
    <>
      {auth.is_authenticated && (
        <div>
          <Slide
            direction="left"
            in={expanded}
            timeout={500}
            mountOnEnter
            unmountOnExit
            onExited={handleTransitionExited}
          >
            <div className={classes.menu}>
              {auth.is_superuser && (
                <>
                  <Tooltip
                    title="Toggle Edit Mode"
                    placement="left"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      className={classes.menuItem}
                      color="primary"
                      onClick={() => setEditing(!editing)}
                      size="small"
                    >
                      {editing ? (
                        <EditOffSharpIcon style={{ fontSize: "1.5rem" }} />
                      ) : (
                        <ModeEditSharpIcon style={{ fontSize: "1.5rem" }} />
                      )}
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
                        style={{ fontSize: "1.5rem" }}
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
                      size="small"
                    >
                      <SmartToySharpIcon style={{ fontSize: "1.5rem" }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {auth.is_authenticated && (
                // Unnecessary but eventually may add some non-authenticated actions to this menu
                <>
                  <Tooltip
                    title="Theme Settings"
                    placement="left"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <ThemeSettings
                      handleUpdate={handleUpdate}
                      classes={classes}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </Slide>
          <Tooltip
            title={expanded ? "Close Menu" : "Open Menu"}
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <Fab
              aria-label="menu"
              className={expanded ? classes.fabExpanded : classes.fab}
              onClick={handleExpandClick}
              size="small"
            >
              <MoreVertSharpIcon style={{ fontSize: "1.5rem" }} />
            </Fab>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default FABMenu;
