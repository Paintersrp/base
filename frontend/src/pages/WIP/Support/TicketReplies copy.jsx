import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  replyForm: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  darkTheme: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
}));

const TicketReplies = ({ replies, onReply }) => {
  const classes = useStyles();
  const [newReply, setNewReply] = useState("");

  const handleReply = () => {
    // handle reply logic
    onReply(newReply);
    setNewReply("");
  };

  return (
    <div className={classes.root}>
      <List className={classes.darkTheme}>
        {replies.map((reply, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{reply.username[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={reply.username} secondary={reply.message} />
          </ListItem>
        ))}
      </List>
      <div className={classes.replyForm}>
        <TextField
          className={classes.textField}
          label="Reply"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          variant="outlined"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleReply}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default TicketReplies;
