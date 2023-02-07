import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FaBars } from "react-icons/fa";
import { GiEnergySword } from "react-icons/gi";
import { Hidden } from "@material-ui/core";
import "./mui-nav.css";

function SimpleCollapse() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isAuthenticated = false;
  return (
    <AppBar position="static">
      <Toolbar className="navbar-container">
        <div className="navbar-general-links">
          <Link to="/" className="title-name navbar-link">
            <GiEnergySword size="16" className="icon-nav" />
            EDGELORDS
          </Link>
        </div>
        <Hidden xsDown>
          <div className="navbar-general-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/" className="navbar-link">
              Services
            </Link>
            <Link to="/" className="navbar-link">
              Contact
            </Link>
            <Link to="/test" className="navbar-link">
              Test
            </Link>
            <Link to="/heroes" className="navbar-link">
              Heroes
            </Link>
            <Link to="/features" className="navbar-link">
              Features
            </Link>
          </div>
        </Hidden>
        <Hidden xsDown>
          {isAuthenticated ? (
            <div className="navbar-auth-links">
              <Link to="/logout" className="navbar-link">
                Logout
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </div>
          )}
        </Hidden>
        <Hidden smUp>
          <Button onClick={toggleMenu}>
            <FaBars color="#fff" className="nav-menu-btn" />
          </Button>
        </Hidden>
        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={toggleMenu}
          className="drawer-container"
        >
          <List className="navbar-drawer">
            <div className="navbar-general-links">
              <Link to="/" className="title-name-drawer navbar-link">
                <GiEnergySword size="16" className="icon-nav" />
                EDGELORDS
              </Link>
            </div>
            <Divider className="divider-color" light={true} />
            <Link to="/home" className="navbar-link" onClick={toggleMenu}>
              <ListItem button className="">
                <ListItemText className="test" primary="Home" />
              </ListItem>
            </Link>
            <Link to="/about" className="navbar-link" onClick={toggleMenu}>
              <ListItem button>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
            <Link to="/services" className="navbar-link" onClick={toggleMenu}>
              <Link to="/contact" className="navbar-link" onClick={toggleMenu}>
                <ListItem button>
                  <ListItemText primary="Contact" />
                </ListItem>
              </Link>
              <Divider className="divider-color" light={true} />
              {isAuthenticated ? (
                <div>
                  <Link
                    to="/logout"
                    className="navbar-link"
                    onClick={toggleMenu}
                  >
                    <ListItem button>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </Link>
                  <Link
                    to="/profile"
                    className="navbar-link"
                    onClick={toggleMenu}
                  >
                    <ListItem button>
                      <ListItemText primary="Profile" />
                    </ListItem>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="navbar-link"
                    onClick={toggleMenu}
                  >
                    <ListItem button>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </Link>
                  <Link
                    to="/register"
                    className="navbar-link"
                    onClick={toggleMenu}
                  >
                    <ListItem button>
                      <ListItemText primary="Register" />
                    </ListItem>
                  </Link>
                </div>
              )}
            </Link>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleCollapse;
