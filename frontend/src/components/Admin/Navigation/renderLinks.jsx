import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Tooltip,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import mapAppIcon from "./mapModelIcons";

export default function renderLinks({
  models,
  classes,
  theme,
  handleClick,
  openLinks,
  toggleDrawer,
}) {
  return Object.entries(models).map(([appName, appModels], index) => {
    if (appName === "authorization") {
      return null;
    }

    return (
      <div key={appName}>
        <Tooltip
          title={`View ${
            appName.charAt(0).toUpperCase() + appName.slice(1)
          } Models`}
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
          <ListItem
            button
            onClick={() => handleClick(appName)}
            className={classes.links}
          >
            <ListItemIcon
              style={{
                color: (() => {
                  switch (index % 2) {
                    case 0:
                      return theme.palette.secondary.main;
                    case 1:
                      return theme.palette.primary.light;
                    case 2:
                      return theme.palette.secondary.dark;
                    default:
                      return "white";
                  }
                })(),
              }}
            >
              {mapAppIcon(appName)}
            </ListItemIcon>
            <ListItemText
              className={classes.linkText}
              primary={appName.charAt(0).toUpperCase() + appName.slice(1)}
            />
            {openLinks[appName] ? (
              <ExpandLessIcon style={{ color: "white" }} />
            ) : (
              <ExpandMoreIcon style={{ color: "white" }} />
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openLinks[appName]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {appModels
              .filter((model) => model.url !== null)
              .map((model) => (
                <Tooltip
                  title={`Manage ${model.verbose_name}`}
                  placement="right"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link
                    to={`/admin/${model.model_name}`}
                    state={{
                      url: model.url,
                      keys: model.keys,
                      appName: appName,
                      model: model,
                      metadata: model.metadata,
                    }}
                    key={model.model_name}
                  >
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <ChevronRightIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary={model.verbose_name} />
                    </ListItem>
                  </Link>
                </Tooltip>
              ))}
          </List>
        </Collapse>
      </div>
    );
  });
}
