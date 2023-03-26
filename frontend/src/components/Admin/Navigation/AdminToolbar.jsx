import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import {
  Badge,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MessageIcon from "@mui/icons-material/Message";
import handleLogout from "../../../lib/Auth/Logout";
import SubjectIcon from "@mui/icons-material/Subject";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ApprovalIcon from "@mui/icons-material/Approval";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 24,
    [theme.breakpoints.down("sm")]: {
      marginRight: 16,
    },
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
    marginRight: 8,
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
  dashLinkButton: {
    minWidth: 120,
    color: theme.palette.text.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const AdminToolbar = ({ open, toggleDrawer, setCount, count }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axiosInstance
      .get("/messages/unread/")
      .then((response) => {
        setData(response.data.messages);
        setCount(response.data.count);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Toolbar>
      {count && data && (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <SubjectIcon className={classes.altIcon} />
          </IconButton>

          <Tooltip
            title="View Dashboard"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to="/admin">
              <IconButton
                size="small"
                aria-label=""
                color="inherit"
                className={classes.accountButtonIcon}
              >
                <DashboardIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip
            title="View Messages"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link
              to={"admin/messages"}
              state={{
                type: "new",
              }}
            >
              <IconButton
                size="small"
                aria-label="show messages"
                color="inherit"
                className={classes.accountButtonIcon}
              >
                <Badge
                  badgeContent={count}
                  color="secondary"
                  small
                  className={classes.badge}
                >
                  <MessageIcon />
                </Badge>
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip
            title="View Applications"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to={"admin/application"}>
              <IconButton
                size="small"
                aria-label=""
                color="inherit"
                className={classes.accountButtonIcon}
              >
                <ApprovalIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip
            title="View Admin Log"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link
              to={"adminlog"}
              state={{
                appName: null,
                modelName: null,
              }}
            >
              <IconButton
                size="small"
                aria-label="show messages"
                color="inherit"
                className={classes.accountButtonIcon}
              >
                <AutoStoriesIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip
            title="Account"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              className={classes.accountButtonIcon}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
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
            MenuListProps={{
              style: {
                padding: 0,
              },
            }}
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
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
          <div className={classes.exitButtonContainer}>
            <Tooltip
              title="Back to Home Page"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Link to="/">
                <IconButton
                  size="small"
                  aria-label="show messages"
                  color="inherit"
                  className={classes.accountButtonIcon}
                >
                  <ExitToAppIcon className={classes.altIcon} />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        </>
      )}
    </Toolbar>
  );
};

export default AdminToolbar;
