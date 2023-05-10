import * as React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, makeStyles, IconButton } from "@material-ui/core";
import clsx from "clsx";
import BuilderDrawerItem from "../BuilderNavDrawerItem/BuilderDrawerItem";
import { drawerWidth } from "../../const/drawerOptions";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#2e3b55",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#2e3b55",
    width: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  },
  prevButton: {
    color: "#42a5f5",
    marginRight: 4,
    "&:hover": {
      backgroundColor: "#42a5f5",
      color: theme.palette.background.default,
    },
  },
}));

export default function BuilderNavDrawer({
  open,
  handleDrawerClose,
  stepOptions,
  controlOptions,
  openSection,
}) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      open={open}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.drawerHeader}>
        <div style={{ width: "100%" }}>
          <Typography
            variant="button"
            align="center"
            noWrap
            component="div"
            color="#F5F5F5"
          >
            Builder Steps
          </Typography>
        </div>
        <IconButton
          onClick={handleDrawerClose}
          size="small"
          className={classes.prevButton}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      {open ? (
        <Divider style={{ backgroundColor: theme.palette.text.secondary }} />
      ) : null}
      <List sx={{ padding: 0 }}>
        {stepOptions.map((option, index) => (
          <BuilderDrawerItem
            open={open}
            option={option}
            openSection={openSection}
          />
        ))}
      </List>
      <Divider style={{ backgroundColor: theme.palette.text.secondary }} />
      <List sx={{ padding: 0 }}>
        {controlOptions.map((option, index) => (
          <BuilderDrawerItem
            open={open}
            option={option}
            openSection={openSection}
          />
        ))}
      </List>
      <Divider style={{ backgroundColor: theme.palette.text.secondary }} />
    </Drawer>
  );
}
