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
import renderLinks from "./renderLinks";

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
    fontSize: "1.1rem",
    fontFamily: "Roboto",
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
  appName: {
    fontWeight: 800,
    fontSize: "1.05rem",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  menuButtonOpen: {
    "&:hover": {
      color: theme.palette.secondary.main,
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
    setTimeout(() => {
      setOpenLinks({});
    }, 300);
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
                  <MenuIcon className={classes.menuButtonOpen} />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={11}
                alignItems="center"
                justifyContent="flex-end"
                style={{ display: "flex" }}
              >
                <div>
                  <Link className={classes.appLink} to="/">
                    <div className={classes.appName}>BACK TO {appName}</div>
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
          {renderLinks({
            models,
            classes,
            theme,
            handleClick,
            openLinks,
            toggleDrawer,
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default AdminSidebar;
