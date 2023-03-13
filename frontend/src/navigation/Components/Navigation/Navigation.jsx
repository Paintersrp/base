import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { GiEnergySword } from "react-icons/gi";
import NavigationDrawer from "./NavigationDrawer";
import {
  Grid,
  Slide,
  useMediaQuery,
  useScrollTrigger,
} from "@material-ui/core";
import NavigationBase from "../NavigationBase";
import AppbarContent from "./AppbarContent";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    maxWidth: "100%",
    width: "100%",
    paddingBottom: 60,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
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
    textAlign: "end",
    width: "100%",
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    height: 60,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: "none",
  },
  appLink: {
    textAlign: "end",
    justifyContent: "end",
    fontSize: "1.25rem",
    fontWeight: 700,
    position: "relative",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  navLink: {
    color: "#fff",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    textDecoration: "none",
    textTransform: "uppercase",
    position: "relative",
    "&:hover": {
      color: theme.palette.secondary.main,
      transform: "translateY(-2px)",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -5,
        height: 3,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 3,
      },
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default function Navigation({ links, appName }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 500,
    });

    return (
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
        style={{
          transform: trigger ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 20000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
        transitionDuration={20000}
        TransitionProps={{ timeout: { enter: 20000, exit: 20000 } }}
      >
        {children}
      </Slide>
    );
  }

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
    <NavigationBase
      open={open}
      toggleDrawer={toggleDrawer}
      toolBarContent={
        <AppbarContent
          open={open}
          isSmallScreen={isSmallScreen}
          toggleDrawer={toggleDrawer}
          appName={appName}
        />
      }
      drawerContent={
        <NavigationDrawer links={links} toggleDrawer={toggleDrawer} />
      }
    />
  );
}
