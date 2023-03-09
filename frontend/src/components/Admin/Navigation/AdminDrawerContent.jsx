import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import renderLinks from "./renderLinks";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  icon: {
    color: theme.palette.primary.light,
  },
  altIcon: {
    color: theme.palette.secondary.main,
  },
  divider: {
    background: theme.palette.primary.light,
  },
}));

const AdminDrawerContent = ({
  models,
  toggleDrawer,
  openLinks,
  handleClick,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.drawerHeader}>
        <Typography variant="h4" align="center" style={{ width: "100%" }}>
          EDGELORDS
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon className={classes.altIcon} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <List>
        <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className={classes.altIcon} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
      </List>
      <Divider className={classes.divider} />
      {renderLinks({
        models,
        classes,
        theme,
        handleClick,
        openLinks,
        toggleDrawer,
      })}
      <Divider className={classes.divider} />
      <List>
        <Link to="/tasks" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon className={classes.altIcon} />
            </ListItemIcon>
            <ListItemText primary="Admin Log" />
          </ListItem>
        </Link>
        <Link
          to="/settings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Subscriber Log" />
          </ListItem>
        </Link>
      </List>
      <Divider className={classes.divider} />
      <List
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <ListItem>
          <Typography
            align="center"
            variant="caption"
            style={{ width: "100%" }}
          >
            © 2023 Edgelords
            <br />
            All rights reserved.
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default AdminDrawerContent;
