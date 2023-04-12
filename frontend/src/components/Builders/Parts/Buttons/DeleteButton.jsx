import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import ConfirmMenu from "../Menus/ConfirmMenu";

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
}));

const DeleteButton = ({ deleteClick }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton className={classes.iconButton} onClick={handleOpen}>
        <Delete />
      </IconButton>
      <ConfirmMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        confirmClick={deleteClick}
      />
    </div>
  );
};

export default DeleteButton;
