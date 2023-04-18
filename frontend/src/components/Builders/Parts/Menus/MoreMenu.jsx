import React from "react";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    color: theme.palette.common.white,
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1),
    },
  },
  menuItem: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
    },
  },
  innerList: {
    padding: 0,
    textAlign: "center",
  },
  menuPaper: {
    boxShadow: theme.shadows[2],
    borderRadius: 4,
  },
}));

export default function MoreMenu({ anchorEl, handleClose, menuOptions }) {
  const classes = useStyles();

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      getContentAnchorEl={null}
      classes={{ list: classes.innerList, paper: classes.menuPaper }}
      TransitionComponent={Fade}
      MenuListProps={{ dense: true }}
    >
      {menuOptions.map((option) => {
        return (
          <ListItem button onClick={option.click} className={classes.menuItem}>
            <ListItemText primary={option.primary} />
          </ListItem>
        );
      })}
    </Menu>
  );
}
