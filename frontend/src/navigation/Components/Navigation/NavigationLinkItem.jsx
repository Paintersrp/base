import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { linkClasses } from "./navStyles";
import Icon from "../../../components/Elements/Icon/Icon";

export default function NavigationLinkItem({
  onClick,
  to,
  tooltip,
  icon,
  primary,
  color = "#ff8c00",
}) {
  const classes = linkClasses();

  return (
    <Tooltip
      title={tooltip}
      placement="right"
      classes={{ tooltip: classes.tooltip }}
    >
      <ListItem
        button
        className={classes.links}
        component={Link}
        to={to}
        onClick={onClick}
      >
        <ListItemIcon>
          <Icon icon={icon} style={{ color: color }} />
        </ListItemIcon>
        <ListItemText primary={primary} className={classes.linkText} />
      </ListItem>
    </Tooltip>
  );
}
