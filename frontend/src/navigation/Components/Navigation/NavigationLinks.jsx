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
import { Tooltip } from "@material-ui/core";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";

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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
}));

export default function NavigationLinks({ links, toggleDrawer, appData }) {
  console.log("appData", appData);
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState({});

  const handleMenuOpen = (item) => () => {
    setMenuOpen({ ...menuOpen, [item]: !menuOpen[item] });
  };

  return (
    <List style={{ paddingTop: 0, paddingBottom: 0 }}>
      {links.map((item, index) => {
        if (!appData.jobs) {
          if (item.name === "Jobs") {
            return null;
          }
        }
        if (!appData.services) {
          if (item.name === "Services") {
            return null;
          }
        }
        return (
          <React.Fragment key={item.name}>
            <Tooltip
              title={
                item.children
                  ? `Expand Related Pages - ${item.name}`
                  : `View ${item.name} Page`
              }
              placement="right"
              classes={{ tooltip: classes.tooltip }}
            >
              <ListItem
                button
                className={classes.links}
                onClick={
                  item.children
                    ? handleMenuOpen(item.name)
                    : toggleDrawer(false)
                }
                component={Link}
                to={item.link}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  className={classes.linkText}
                />
                {item.children &&
                  (menuOpen[item.name] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
            </Tooltip>
            {item.children && (
              <Collapse in={menuOpen[item.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((subItem) => (
                    <Tooltip
                      title={`View ${subItem.name} Page`}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
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
                    </Tooltip>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
      <Tooltip
        title={`Expand Related Pages - Dynamic`}
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <ListItem
          button
          className={classes.links}
          onClick={handleMenuOpen("dynamic")}
        >
          <ListItemIcon style={{ color: "white" }}>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary={"Dynamic"} className={classes.linkText} />
          <ExpandMore />
        </ListItem>
      </Tooltip>
      <Collapse in={menuOpen["dynamic"]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(appData.page_set_data.pages).map(
            ([id, page], index) => {
              if (page.access === "private") {
                return null;
              }
              return (
                <Tooltip
                  title={`View ${page.page_name} Page`}
                  placement="right"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <ListItem
                    button
                    className={classes.links}
                    onClick={toggleDrawer(false)}
                    component={Link}
                    to={`/${page.page_name}`}
                  >
                    <ListItemIcon style={{ color: "white" }}>
                      <ChevronRightSharpIcon
                        style={{ color: index % 2 === 0 ? "#ff8c00" : null }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={page.verbose_name}
                      className={classes.linkText}
                    />
                  </ListItem>
                </Tooltip>
              );
            }
          )}
        </List>
      </Collapse>
      <Divider style={{ backgroundColor: "grey" }} />
    </List>
  );
}
