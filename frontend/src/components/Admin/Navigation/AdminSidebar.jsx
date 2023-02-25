import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@material-ui/icons/Menu";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    maxWidth: "100%",
    width: "100%",
    paddingBottom: 60,
  },
  titleText: {
    width: "100%",
    color: "white",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeLink: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: "none",
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderModelLinks = (models) => {
    return Object.entries(models).map(([appName, appModels], index) => (
      <div key={appName}>
        <ListItem
          button
          onClick={() => handleClick(appName)}
          className={classes.links}
        >
          <ListItemIcon
            style={{
              color: (() => {
                switch (index % 3) {
                  case 0:
                    return theme.palette.secondary.light;
                  case 1:
                    return theme.palette.primary.light;
                  case 2:
                    return theme.palette.secondary.main;
                  default:
                    return "white";
                }
              })(),
            }}
          >
            <CircleIcon />
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
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ChevronRightIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        model.verbose_name
                        // model.model_name.charAt(0).toUpperCase() +
                        // model.model_name.slice(1)
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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={1}>
                <IconButton
                  onClick={toggleDrawer(true)}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className={
                    !open ? classes.menuButtonClosed : classes.menuButtonOpen
                  }
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={11}
                alignItems="center"
                justifyContent="flex-end"
                style={{ display: "flex" }}
              >
                <div className={classes.appName}>
                  <Link className={classes.appLink} to="/">
                    {appName} ADMIN
                  </Link>
                </div>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        onClose={toggleDrawer(false)}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.toolbar}
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Link to={`/`} style={{ width: "100%" }}>
            <Grid container className={classes.homeLink}>
              <Typography
                variant="h3"
                align="center"
                className={classes.titleText}
              >
                EDGELORDS
              </Typography>
            </Grid>
          </Link>
        </div>
        <List
          style={{
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            padding: 0,
          }}
        >
          {renderModelLinks(models)}
        </List>
      </Drawer>
    </div>
  );
}

export default AdminSidebar;
