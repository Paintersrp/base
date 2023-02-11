import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { GiEnergySword } from "react-icons/gi";
import NavigationDrawer from "./NavigationDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    paddingBottom: 60,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
  },
  appName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: "100%",
    marginRight: 20,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    height: 60,
  },
  appLink: {
    fontSize: "1.25rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    "&:hover": {
      transform: "scale(1.02)",
      color: theme.palette.secondary.main,
    },
  },
}));

export default function Navigation({ links, appName }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
            }}
          >
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.appName}>
              <Link className={classes.appLink} to="/">
                <GiEnergySword size={16} style={{ marginRight: 5 }} />
                {appName}
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawerRoot}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <NavigationDrawer links={links} toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}
