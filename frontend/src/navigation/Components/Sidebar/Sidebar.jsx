import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { GiEnergySword } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaCloud,
  FaMobileAlt,
  FaRocket,
  FaLock,
  FaCog,
  FaLightbulb,
  FaStar,
  FaLaptop,
  FaMailBulk,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import clsx from "clsx";
import { useSpring, animated } from "react-spring";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#1C1C1C",
    color: "white",
    overflow: "hidden",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1,
    color: "white",
    backgroundColor: "#1C1C1C",
    overflow: "hidden",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1C1C1C",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: "60px",
    [theme.breakpoints.up("sm")]: {
      width: "60px",
    },
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "hidden",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: "white",
  },
  appbar: {
    backgroundColor: "#1C1C1C",
    color: "white",
    zIndex: 2,
    boxShadow: "none",
  },
  menuButton: {
    justifyContent: "center",
    color: "white",
    scale: 1,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "white",
  },
  icon_color: {
    color: "white",
    marginLeft: "5px",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: "0.8rem",
    marginRight: 10,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center",
  },
  appName: {
    flexGrow: 1,
    color: "white",
    textAlign: "left",
    fontFamily: "Poppins",
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  userMenu: {
    position: "absolute",
    right: 0,
    top: "100%",
    marginTop: theme.spacing(4),
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "240px",
    overflow: "hidden",
  },
  footerCopyright: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "240px",
    fontWeight: 700,
    fontSize: "10px",
    overflow: "hidden",
  },
  footerContainer: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "240px",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 999,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  const [props, set] = useSpring(() => ({
    opacity: 1,
    transform: openMenu ? "translate3d(0,0px,0)" : "translate3d(-100%,0,0)",
  }));

  set({
    opacity: openMenu ? 1 : 0,
    transform: openMenu ? "translate3d(0,0px,0)" : "translate3d(10px,0px,0)",
  });

  return (
    <div className={classes.root}>
      {/* <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MenuIcon />
          </IconButton>
          <GiEnergySword size="16" className="icon-nav" />
          <Typography variant="h6" className={classes.appName}>
            EDGELORDS
          </Typography>
          <div className="navbar-general-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/services" className="navbar-link">
              Services
            </Link>
            <Link to="/" className="navbar-link">
              Contact
            </Link>
          </div>
          <IconButton
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.userMenu}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar> */}
      <Drawer
        open={openMenu}
        onClose={handleDrawerClose}
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openMenu && classes.drawerClose,
            openMenu && classes.drawerOpen
          ),
        }}
        style={{
          overflow: !openMenu ? "hidden" : "auto",
        }}
      >
        <ListItem
          button
          className={classes.menuButton}
          aria-label="menu"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <MenuIcon style={{ outline: "none !important" }} />
        </ListItem>
        <div className={classes.drawerContainer}>
          <ListItem button>
            <ListItemIcon className={classes.icon_color}>
              <GiEnergySword size="22" className={classes.menuButton} />
            </ListItemIcon>
            <h1 className={classes.appName}>EDGELORDS</h1>
          </ListItem>
          <Divider />
          <List>
            {/* <ListItem>
              <ListItemText
                className={classes.icon_color}
                primary="Username"
                secondary={
                  <p style={{ color: "#FFFFFF", margin: 0, padding: 0 }}>
                    user@example.com
                  </p>
                }
              />
            </ListItem> */}
            <Divider />
            <ListItem button onClick={handleClick}>
              <ListItemIcon className={classes.icon_color}>
                <FaMailBulk className={classes.menuButton} />
              </ListItemIcon>
              <ListItemText primary="Messages" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.icon_color}>
                    <FaStar />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.icon_color}>
                    <FaLaptop />
                  </ListItemIcon>
                  <ListItemText primary="Sent" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.icon_color}>
                    <FaLightbulb />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
            <ListItem button>
              <ListItemIcon className={classes.icon_color}>
                <FaCloud className={classes.menuButton} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.icon_color}>
                <FaRocket className={classes.menuButton} />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.icon_color}>
                <FaLock className={classes.menuButton} />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.icon_color}>
                <FaLock className={classes.menuButton} />
              </ListItemIcon>
              <ListItemText primary="Privacy" />
            </ListItem>
          </List>
        </div>

        {openMenu ? (
          <div className={classes.footerContainer}>
            <div className={classes.footerRow}>
              <Link to="/" className="title-name-footer navbar-link">
                <GiEnergySword size="16" className="icon-nav" />
                EDGELORDS
              </Link>
            </div>
            <div style={{ paddingTop: "10px" }}>
              <a href="#" className="footer-link">
                <FaGithub />
              </a>
              <a href="#" className="footer-link">
                <FaLinkedin />
              </a>
              <a href="#" className="footer-link">
                <FaTwitter />
              </a>
              <a href="#" className="footer-link">
                <FaFacebook />
              </a>
            </div>
            <div>
              <div className={classes.footerCopyright}>
                EDGELORDS™ - COPYRIGHT 2023
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
