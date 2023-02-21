import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  Archive as ArchiveIcon,
  RedoSharp,
  UndoSharp,
} from "@material-ui/icons";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

const MessageDialog = ({ open, onClose, message, handleToggleProperty }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        {message?.subject}
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom variant="h4">
          {message.name}
        </Typography>
        <Typography gutterBottom variant="h4">
          {message.email}
        </Typography>
        <Typography gutterBottom variant="body1">
          {message.message}
        </Typography>
        <Typography gutterBottom>
          {new Date(message.created_at).toLocaleString()}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleToggleProperty(message?.id, "is_archived")}
          color="primary"
          startIcon={
            message?.is_archived ? <UnarchiveOutlinedIcon /> : <ArchiveIcon />
          }
        >
          {message?.is_archived ? "Unarchive" : "Archive"}
        </Button>
        <Button
          onClick={() => handleToggleProperty(message?.id, "is_replied")}
          color="primary"
          startIcon={message?.is_replied ? <RedoSharp /> : <UndoSharp />}
        >
          {message?.is_replied ? "Mark Unreplied" : "Mark Replied"}
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
