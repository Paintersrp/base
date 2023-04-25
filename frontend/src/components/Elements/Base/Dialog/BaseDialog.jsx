import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",

    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(2),
    maxHeight: 60,
    "& h2": {
      margin: 0,
    },
  },
  closeButtonContainer: {
    padding: theme.spacing(2),
    color: "#fff",
    position: "absolute",
    right: 0,
    top: 0,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  closeButton: {},
  dialogActions: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    color: "white",
    maxHeight: 60,
  },
  btnContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  dialogPaper: {
    borderRadius: 0,
    background: theme.palette.background.light,
    width: "100%",
    padding: 0,
  },
}));

const BaseDialog = ({
  open,
  onClose,
  title,
  content,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  children,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      style={{ borderRadius: 16 }}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="xl"
    >
      <Typography
        className={classes.dialogTitle}
        id="dialog-title"
        variant="h4"
        style={{ width: "100%", borderRadius: 0, textAlign: "center" }}
      >
        {title}
      </Typography>
      <div className={classes.closeButtonContainer}>
        <CloseIcon onClick={onClose} />
      </div>
      <DialogContent style={{ borderRadius: 16, width: "100%", padding: 0 }}>
        {content && (
          <DialogContentText style={{ borderRadius: 16, margin: 0 }}>
            {content}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {primaryButtonText && (
          <Button onClick={onPrimaryButtonClick} style={{ color: "white" }}>
            {primaryButtonText}
          </Button>
        )}
        {secondaryButtonText && (
          <Button onClick={onClose} style={{ color: "white" }}>
            {secondaryButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
