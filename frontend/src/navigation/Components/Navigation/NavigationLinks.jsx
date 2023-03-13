import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  links: {
    "&:hover": {
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
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
}));

export default function NavigationLinks({ links, toggleDrawer }) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState({});

  const handleMenuOpen = (item) => () => {
    setMenuOpen({ ...menuOpen, [item]: !menuOpen[item] });
  };

  return (
    <List style={{ paddingTop: 0, paddingBottom: 0 }}>
      {links.map((item, index) => (
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
            <ListItemIcon style={{ color: "white" }}>{item.icon}</ListItemIcon>
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
                    onClick={toggleDrawer(false)}
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
      <Divider style={{ backgroundColor: "grey" }} />
    </List>
  );
}
