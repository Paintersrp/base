import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketReplies from "./TicketReplies";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#242424",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "#242424",
  },
  switchControl: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  darkTheme: {
    color: theme.palette.common.white,
    backgroundColor: "#242424",
  },
  formContainer: {},
}));

const TicketView = ({ ticket, onEdit, startEdit }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(startEdit);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // handle save logic
    setEditing(false);
    onEdit(ticket);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className={`${classes.root} ${classes.darkTheme}`}>
      {editing ? (
        <div className={classes.formContainer}>
          <form className={classes.formContainer}>
            <TextField
              className={classes.textField}
              label="Title"
              variant="outlined"
              value={ticket.title}
              onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            />
            <TextField
              className={classes.textField}
              label="Description"
              variant="outlined"
              value={ticket.description}
              onChange={(e) =>
                setTicket({ ...ticket, description: e.target.value })
              }
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={ticket.status}
                onChange={(e) =>
                  setTicket({ ...ticket, status: e.target.value })
                }
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              className={classes.switchControl}
              control={
                <Switch
                  checked={ticket.isUrgent}
                  onChange={(e) =>
                    setTicket({ ...ticket, isUrgent: e.target.checked })
                  }
                  name="isUrgent"
                  color="primary"
                />
              }
              label="Is Urgent"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        /* <TicketReplies /> */
        <>
          <Typography variant="h5">{ticket.title}</Typography>
          <Typography variant="body1">{ticket.description}</Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {ticket.status}
          </Typography>
          <Typography variant="body1">
            <strong>Is Urgent:</strong> {ticket.isUrgent ? "Yes" : "No"}
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>

          {/* <TicketReplies /> */}
        </>
      )}
    </div>
  );
};

export default TicketView;
