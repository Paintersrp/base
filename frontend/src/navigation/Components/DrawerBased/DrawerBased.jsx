import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  FaAddressCard,
  FaBell,
  FaBoxOpen,
  FaInfoCircle,
  FaHome,
  FaSignInAlt,
  FaUnlockAlt,
  FaHSquare,
  FaHandLizard,
  FaCogs,
  FaRegNewspaper,
  FaSignOutAlt,
  FaUserAlt,
  FaDashcube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiEnergySword, GiPlatform } from "react-icons/gi";
import { MdAdminPanelSettings, MdContactSupport } from "react-icons/Md";
import { useSelector } from "react-redux";
import handleLogout from "../../../lib/Auth/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  drawerPaper: {
    backgroundColor: "#1C1C1C",
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  search: {
    padding: theme.spacing(1, 2),
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontSize: "0.8rem",
    },
    "& input": {
      color: "white",
    },
  },
  label: {
    color: "white",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    color: "white",
  },
  profileIcon: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
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
  sublinkText: {
    "& .MuiTypography-body1": {
      color: "white",
      fontFamily: "Poppins",
      fontWeight: "400",
      fontSize: "0.8rem",
    },
    "& input": {
      color: "white",
    },
  },
  appName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: "100%",
    marginRight: 20,
  },
  appLink: {
    fontSize: "1.25rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    "&:hover": {
      transform: "scale(1.02)",
      color: "gold",
    },
  },
}));

const items = [
  {
    name: "Home",
    icon: <FaHome size={22} />,
    link: "/",
  },
  {
    name: "Articles",
    icon: <FaRegNewspaper size={22} />,
    link: "/articles",
  },
  {
    name: "About",
    icon: <FaInfoCircle size={22} />,
    link: "/about",
  },
  {
    name: "Services",
    icon: <FaBell size={22} />,
    link: "/about",
  },
  {
    name: "Contact",
    icon: <FaAddressCard size={22} />,
    link: "/about",
  },
  {
    name: "Support",
    icon: <MdContactSupport size={22} />,
    link: "/ticket",
  },
  {
    name: "Demos",
    icon: <FaBoxOpen size={22} />,
    children: [
      {
        name: "Hero Components",
        link: "/heroes",
        icon: <FaHSquare size={22} />,
      },
      {
        name: "Feature Components",
        link: "/features",
        icon: (
          <FaHandLizard style={{ transform: "rotate(180deg)" }} size={22} />
        ),
      },
      {
        name: "Form Components",
        link: "/forms",
        icon: <GiPlatform size={22} />,
      },
      {
        name: "Parts Components",
        link: "/parts",
        icon: <FaCogs size={22} />,
      },
    ],
  },
];

export default function DrawerBased() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState({});
  const [filteredItems, setFilteredItems] = useState(items);
  const [parentName, setParentName] = useState("");
  const auth = useSelector((state) => state.auth);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleMenuOpen = (item) => () => {
    setParentName(item);
    setMenuOpen({ ...menuOpen, [item]: !menuOpen[item] });
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
    setSearch(searchValue);
  };

  const handleSubMenu = (item) => () => {
    setOpen(false);
    setMenuOpen(parentName);
  };

  const sideList = () => (
    <div className={classes.list}>
      <div className={classes.search}>
        <TextField
          className={classes.searchInput}
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Divider style={{ backgroundColor: "grey" }} />
      <ListItem>
        <ListItemIcon style={{ color: "white" }}>
          <AccountCircle className={classes.profileIcon} />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
      <Divider style={{ backgroundColor: "grey" }} />

      <List>
        {filteredItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <ListItem
              button
              className={classes.links}
              onClick={
                item.children ? handleMenuOpen(item.name) : toggleDrawer(false)
              }
              component={Link}
              to={item.link}
            >
              <ListItemIcon style={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} className={classes.linkText} />
              {item.children &&
                (menuOpen[item.name] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.children && (
              <Collapse in={menuOpen[item.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.name}
                      className={classes.nested}
                      component={Link}
                      to={subItem.link}
                      onClick={handleSubMenu(item.name)}
                    >
                      <ListItemIcon style={{ color: "white" }}>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={subItem.name}
                        className={classes.sublinkText}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider style={{ backgroundColor: "grey" }} />
      <>
        {auth.is_authenticated ? (
          <>
            <ListItem
              button
              className={classes.links}
              component={Link}
              to="/profile"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon style={{ color: "white" }}>
                <FaUserAlt size={22} />
              </ListItemIcon>
              <ListItemText primary="Profile" className={classes.linkText} />
            </ListItem>
            <ListItem
              button
              className={classes.links}
              component={Link}
              to="/"
              onClick={() => {
                toggleDrawer(false);
                handleLogout();
              }}
            >
              <ListItemIcon style={{ color: "white" }}>
                <FaSignOutAlt size={22} />
              </ListItemIcon>
              <ListItemText primary="Logout" className={classes.linkText} />
            </ListItem>
            <ListItem
              button
              className={classes.links}
              component="a"
              href="http://localhost:8000/admin"
              onClick={() => {
                toggleDrawer(false);
              }}
            >
              <ListItemIcon style={{ color: "white" }}>
                <FaDashcube size={22} />
              </ListItemIcon>
              <ListItemText primary="Admin" className={classes.linkText} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              className={classes.links}
              component={Link}
              to="/register"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon style={{ color: "white" }}>
                <FaUnlockAlt size={22} />
              </ListItemIcon>
              <ListItemText primary="Register" className={classes.linkText} />
            </ListItem>
            <ListItem
              button
              className={classes.links}
              component={Link}
              to="/login"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon style={{ color: "white" }}>
                <FaSignInAlt size={22} />
              </ListItemIcon>
              <ListItemText primary="Login" className={classes.linkText} />
            </ListItem>
          </>
        )}
      </>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#1C1C1C" }}>
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
                EDGELORDS
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
        {sideList()}
      </Drawer>
    </div>
  );
}
