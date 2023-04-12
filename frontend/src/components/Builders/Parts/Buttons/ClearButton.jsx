import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import ConfirmMenu from "../Menus/ConfirmMenu";
import StyledButton from "../../../Elements/Buttons/StyledButton";

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
  disabledButton: {
    backgroundColor: theme.palette.action.disabledBackground,
    "& .MuiIconButton-label": {
      color: theme.palette.action.disabled,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
}));

const ClearButton = ({
  clearFunc,
  disabled,
  variant = "icon",
  skipConfirm = false,
}) => {
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
      {variant === "icon" && (
        <IconButton
          className={`${classes.iconButton} ${
            disabled ? classes.disabledButton : ""
          }`}
          onClick={skipConfirm ? clearFunc : handleOpen}
          disabled={disabled}
        >
          <ClearIcon />
        </IconButton>
      )}
      {variant === "button" && (
        <StyledButton
          maxWidth={85}
          minWidth={85}
          maxHeight={25}
          margin={0}
          size="small"
          color="#f44336"
          startIcon={<ClearIcon />}
          onClick={skipConfirm ? clearFunc : handleOpen}
          buttonText={`Clear`}
          noHover
        />
      )}
      <ConfirmMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        confirmClick={clearFunc}
      />
    </div>
  );
};

export default ClearButton;
