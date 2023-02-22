import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperMinimized: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  minimizeButton: {
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: "63px",
  },
  nonMinimizeButton: {
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: "63px",
    borderBottom: "1px solid white",
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  linkText: {
    "& .MuiTypography-body1": {
      color: "white",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
  },
}));

function AdminSidebar({ appName }) {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [openLinks, setOpenLinks] = useState({});
  const [open, setOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data);
        console.log("models: ", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (appName) => {
    setOpenLinks((prevState) => ({
      ...prevState,
      [appName]: !prevState[appName],
    }));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const renderModelLinks = (models) => {
    return Object.entries(models).map(([appName, appModels]) => (
      <div key={appName}>
        <ListItem
          button
          onClick={() => handleClick(appName)}
          className={classes.links}
        >
          <ListItemIcon style={{ color: "white" }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.linkText}
            primary={appName.charAt(0).toUpperCase() + appName.slice(1)}
          />
          {openLinks[appName] ? (
            <ExpandLessIcon style={{ color: "white" }} />
          ) : (
            <ExpandMoreIcon style={{ color: "white" }} />
          )}
        </ListItem>
        <Collapse in={openLinks[appName]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {appModels
              .filter((model) => model.url !== null)
              .map((model) => (
                <Link
                  to={`/admin/${model.model_name}`}
                  state={{ url: model.url, keys: model.keys }}
                  key={model.model_name}
                >
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemIcon>
                      <ChevronRightIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        model.model_name.charAt(0).toUpperCase() +
                        model.model_name.slice(1)
                      }
                    />
                  </ListItem>
                </Link>
              ))}
          </List>
        </Collapse>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        onClose={toggleDrawer(false)}
        open={open}
        classes={{
          paper: isMinimized
            ? classes.drawerPaperMinimized
            : classes.drawerPaper,
        }}
        variant="permanent"
      >
        {isMinimized ? (
          <div className={classes.nonMinimizeButton}>
            <IconButton onClick={() => setIsMinimized(false)}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        ) : (
          <>
            <div
              className={classes.toolbar}
              style={{ borderBottom: "1px solid white" }}
            >
              <Grid
                container
                style={{
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  align="center"
                  style={{ width: "100%", color: "white" }}
                >
                  {appName}
                </Typography>
              </Grid>
            </div>
            <List style={{ padding: 0 }}>{renderModelLinks(models)}</List>
            <div className={classes.minimizeButton}>
              <IconButton onClick={() => setIsMinimized(true)}>
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
            </div>
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default AdminSidebar;
