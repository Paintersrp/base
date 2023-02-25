import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  DialogActions,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import {
  Archive as ArchiveIcon,
  RedoSharp,
  UndoSharp,
} from "@material-ui/icons";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    backgroundColor: "#F5F5F5",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  sectionTitle: {
    marginLeft: theme.spacing(0.25),
    marginBottom: theme.spacing(0.25),
  },
  messageBox: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(0),
    backgroundColor: "#F5F5F5",
    border: "1px solid #ccc",
  },
  bodyBox: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(0),
    backgroundColor: "#F5F5F5",
    border: "1px solid #ccc",
    minHeight: 200,
  },
}));

const MessageDialog = ({ open, onClose, message, handleToggleProperty }) => {
  const classes = useStyles();
  const [data, setData] = useState(message);

  const handleUpdateArchived = async (id) => {
    const updatedData = await handleToggleProperty(id, "is_archived");
    setData(updatedData);
  };

  const handleUpdateRead = async (id) => {
    const updatedData = await handleToggleProperty(id, "is_read");
    setData(updatedData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              Name
            </Typography>
            <Paper className={classes.messageBox} elevation={0}>
              <Typography>{data?.name}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              Email
            </Typography>
            <Paper className={classes.messageBox} elevation={0}>
              <Typography>{data?.email}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              Subject
            </Typography>
            <Paper className={classes.messageBox} elevation={0}>
              <Typography>{data?.subject}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              Message
            </Typography>
            <Paper className={classes.bodyBox} elevation={0}>
              <Typography>{data?.message}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {new Date(data?.created_at).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              onClick={() => handleUpdateRead(data?.id)}
              color="primary"
              variant="contained"
              startIcon={
                data?.is_read ? <MarkEmailUnreadIcon /> : <MarkEmailReadIcon />
              }
              style={{ marginRight: 8 }}
            >
              {data?.is_read ? "Mark Unread" : "Mark Read"}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleUpdateArchived(data?.id)}
              startIcon={
                data?.is_archived ? <UnarchiveOutlinedIcon /> : <ArchiveIcon />
              }
              style={{ marginLeft: 8 }}
            >
              {data?.is_archived ? "Unarchive" : "Archive"}
            </Button>
          </Grid>
          <Button color="primary" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
