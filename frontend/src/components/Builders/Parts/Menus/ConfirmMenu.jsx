import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Fade, IconButton, Menu, Tooltip } from "@material-ui/core";
import { CheckCircleOutline, Cancel } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
    "& .MuiIconButton-label": {
      transition: "color 0.3s",
      color: theme.palette.error.main,
    },
    "&:hover .MuiIconButton-label": {
      color: theme.palette.common.white,
    },
    borderRadius: "50%",
    padding: 0,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  iconButtonConfirm: {
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
    "& .MuiIconButton-label": {
      transition: "color 0.3s",
      color: theme.palette.success.main,
    },
    "&:hover .MuiIconButton-label": {
      color: theme.palette.common.white,
    },
    borderRadius: "50%",
    padding: 0,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  menu: {
    padding: theme.spacing(0),
    minWidth: 75,
    maxWidth: 75,
  },
  innerList: {
    padding: 0,
  },
  button: {
    margin: theme.spacing(0),
  },
  menuButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
    marginBottom: 4,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const ConfirmMenu = ({ anchorEl, confirmClick, handleClose }) => {
  const classes = useStyles();

  const confirmAndClose = () => {
    confirmClick();
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      getContentAnchorEl={null}
      classes={{ list: classes.innerList }}
      TransitionComponent={Fade}
    >
      <div className={classes.menu}>
        <div className={classes.menuButtonContainer}>
          <Tooltip
            title="Confirm"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              className={classes.iconButtonConfirm}
              onClick={confirmAndClose}
            >
              <CheckCircleOutline />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <div className={classes.menuButtonContainer}>
          <Tooltip
            title="Cancel"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton className={classes.iconButton} onClick={handleClose}>
              <Cancel />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Menu>
  );
};

export default ConfirmMenu;
