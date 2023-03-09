import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import { Badge, Menu, MenuItem } from "@material-ui/core";
import MessageIcon from "@mui/icons-material/Message";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  icon: {
    color: theme.palette.primary.light,
  },
  altIcon: {
    color: theme.palette.secondary.main,
  },
  exitButton: {
    marginLeft: theme.spacing(0.25),
  },
  exitButtonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  accountButtonIcon: {
    color: theme.palette.secondary.main,
    marginRight: 24,
    "&:hover": {
      color: theme.palette.secondary.main,
      textDecoration: "underline",
      underlineOffset: 4,
      backgroundColor: theme.palette.primary.light,
    },
  },
  badgeIcon: {
    marginRight: theme.spacing(1),
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  badge: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

const AdminToolbar = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: open,
        })}
      >
        <MenuIcon className={classes.altIcon} />
      </IconButton>
      <Typography variant="h6" noWrap style={{ minWidth: 120, marginRight: 8 }}>
        Admin Dashboard
      </Typography>
      <div className={classes.accountButton}></div>
      <IconButton
        aria-label="show notifications"
        aria-controls="notifications-menu"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
        className={classes.badgeIcon}
      >
        <Badge badgeContent={2} color="secondary">
          <NotificationsIcon className={classes.notificationIcon} />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="show messages"
        color="inherit"
        className={classes.badgeIcon}
      >
        <Badge badgeContent={8} color="secondary">
          <MessageIcon />
        </Badge>
      </IconButton>
      <div className={classes.exitButtonContainer}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
          className={classes.accountButtonIcon}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              marginTop: "8px",

              maxHeight: "calc(100vh - 120px)",
              width: "200px",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
        <Typography>Back to Site</Typography>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton color="inherit" className={classes.exitButton}>
            <ExitToAppIcon className={classes.altIcon} />
          </IconButton>
        </Link>
      </div>
    </Toolbar>
  );
};

export default AdminToolbar;
