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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MessageIcon from "@mui/icons-material/Message";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import renderLinks from "./renderLinks";
import ApprovalIcon from "@mui/icons-material/Approval";
import { Badge, Tooltip } from "@material-ui/core";

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
  links: {
    "&:hover": {
      background: theme.palette.text.secondary,
    },
  },
  badge: {
    "& .MuiBadge-badge": {
      fontSize: 11,
      background: theme.palette.primary.light,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  linkText: {
    fontSize: "5rem",
  },
  nestedText: {
    fontSize: "0.8rem",
  },
  nestedLinks: {
    "&:hover": {
      background: theme.palette.text.secondary,
    },
  },
}));

const AdminDrawerContent = ({
  models,
  toggleDrawer,
  openLinks,
  handleClick,
  count,
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

      <Tooltip
        title="Back to Dashboard"
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem
            button
            className={classes.links}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <DashboardIcon className={classes.altIcon} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </Tooltip>

      <Tooltip
        title="View Unread Messages"
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <Link
          to="/admin/messages"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem
            button
            onClick={toggleDrawer(false)}
            className={classes.links}
          >
            <ListItemIcon>
              <Badge
                badgeContent={count}
                color="secondary"
                small
                className={classes.badge}
              >
                <MessageIcon className={classes.icon} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </Link>
      </Tooltip>
      <Tooltip
        title="View Applications"
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <Link
          to="/admin/application"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem
            button
            className={classes.links}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <ApprovalIcon className={classes.altIcon} />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
        </Link>
      </Tooltip>
      <Tooltip
        title="Full Admin Log"
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <Link
          to="/adminlog"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem
            button
            onClick={toggleDrawer(false)}
            className={classes.links}
          >
            <ListItemIcon>
              <AutoStoriesIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Admin Log" />
          </ListItem>
        </Link>
      </Tooltip>
      {/* <Tooltip
        title="View User Log"
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem
            button
            className={classes.links}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <PeopleIcon className={classes.altIcon} />
            </ListItemIcon>
            <ListItemText primary="Users (WIP)" />
          </ListItem>
        </Link>
      </Tooltip> */}

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
