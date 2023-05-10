import * as React from "react";
import { useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "13px",
  },
}));

export default function BuilderDrawerItem({ open, option, openSection }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ListItem key={option.text} sx={{ display: "block", padding: 0 }}>
      <Tooltip
        title={`Step: ${option.text}`}
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <ListItemButton
          onClick={() => openSection(option.text)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            "&:hover": {
              backgroundColor: "#3f4c67",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: theme.palette.primary.light,
            }}
          >
            {option.icon}
          </ListItemIcon>
          <ListItemText
            primary={option.text}
            sx={{ opacity: open ? 1 : 0, color: "#F5F5F5" }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
