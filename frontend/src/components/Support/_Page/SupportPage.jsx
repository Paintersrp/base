import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },
  paper: {
    backgroundColor: "#242424",
    width: "100%",
    minHeight: "77.5vh",
    display: "flex",
    flexDirection: "row",
    boxShadow: "none",
  },
  ticketsList: {
    width: "15%",
    paddingRight: theme.spacing(3),
  },
  ticketView: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  ticket: {
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  selectedTicket: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  secondaryText: {
    color: "white",
    fontSize: "0.7rem",
  },
  replies: {
    marginTop: theme.spacing(3),
    color: "white",
  },
  reply: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    color: "white",
  },
  replyContent: {
    flex: 1,
    paddingLeft: theme.spacing(2),
    color: "white",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
    width: "100%",
    marginTop: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
  ticketTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  ticketDescription: {
    marginBottom: theme.spacing(2),
  },
  ticketMeta: {
    fontSize: "0.8rem",
    color: "gray",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

function SupportPage() {
  const classes = useStyles();

  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Ticket 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, dolorem aut similique dolorum voluptatum, vitae reprehenderit consectetur aliquam quos nemo fuga doloribus magnam nostrum obcaecati praesentium, officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam.  officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam.  officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam.  officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam  officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam. officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam. officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam. officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam. officiis rerum amet eaque ut! Laborum deserunt ipsum reprehenderit autem, qui est delectus veniam..",
      createdBy: "John Doe",
      createdOn: "2022-01-01",
      status: "Open",
      priority: "High",
    },
    {
      id: 2,
      title: "Ticket 2",
      description: "Description of Ticket 2",
      createdBy: "John Doe",
      createdOn: "2022-01-01",
      status: "Open",
      priority: "High",
    },
    {
      id: 3,
      title: "Ticket 3",
      description: "Description of Ticket 3",
      createdBy: "John Doe",
      createdOn: "2022-01-01",
      status: "Open",
      priority: "High",
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [editTicket, setEditTicket] = useState({ title: "", description: "" });
  const [replies, setReplies] = useState([
    {
      id: 1,
      text: "This is a sample reply",
      author: {
        name: "John Doe",
      },
      createdAt: "2022-01-01T12:00:00Z",
    },
    {
      id: 2,
      text: "This is another sample reply",
      author: {
        name: "Kane Smith",
      },
      createdAt: "2022-01-02T12:00:00Z",
    },
  ]);
  const [newReply, setNewReply] = useState("");

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setEditTicket({ title: ticket.title, description: ticket.description });
  };

  const handleNewTicketChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleNewTicketSubmit = (e) => {
    e.preventDefault();
    setTickets([...tickets, newTicket]);
    setNewTicket({ title: "", description: "" });
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    setReplies([
      ...replies,
      {
        id: replies.length + 1,
        text: newReply,
        author: {
          name: "John Doe",
        },
        createdAt: "2022-01-02T12:00:00Z",
      },
    ]);
    setNewReply("");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.ticketsList}>
          <List style={{ paddingTop: 0 }}>
            {tickets.map((ticket) => (
              <ListItem
                button
                className={clsx(
                  classes.ticket,
                  selectedTicket && selectedTicket.id === ticket.id
                    ? classes.selectedTicket
                    : null
                )}
                key={ticket.id}
                onClick={() => handleTicketSelect(ticket)}
              >
                <ListItemText primary={ticket.title} />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedTicket("create")}
          >
            Create Ticket
          </Button>
        </div>

        <div className={classes.ticketView}>
          {selectedTicket === "create" ? (
            <div>
              <Typography variant="h5">Create Ticket</Typography>
              <form onSubmit={handleNewTicketSubmit}>
                <TextField
                  label="Title"
                  className={classes.textField}
                  name="title"
                  value={newTicket.title}
                  onChange={handleNewTicketChange}
                  margin="normal"
                  required
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  className={classes.textField}
                  name="description"
                  value={newTicket.description}
                  onChange={handleNewTicketChange}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Create Ticket
                </Button>
              </form>
            </div>
          ) : selectedTicket === null ? (
            <Typography variant="h5">Select a ticket to view</Typography>
          ) : (
            <div>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" className={classes.ticketTitle}>
                    {selectedTicket.title}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.ticketDescription}>
                    {selectedTicket.description}
                  </Typography>
                  <Typography className={classes.ticketMeta}>
                    <strong>Created by:</strong> {selectedTicket.createdBy}
                    <br />
                    <strong>Created on:</strong> {selectedTicket.createdOn}
                    <br />
                    <strong>Status:</strong> {selectedTicket.status}
                    <br />
                    <strong>Priority:</strong> {selectedTicket.priority}
                  </Typography>
                </CardContent>
              </Card>
              <div className={classes.replies}>
                <Typography variant="h6">Replies</Typography>
                <Divider />

                <Card>
                  <List>
                    {replies.map((reply) => (
                      <ListItem key={reply.id} className={classes.reply}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Avatar className={classes.replyAvatar}>
                              {reply.author.name[0]}
                            </Avatar>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography
                                  gutterBottom
                                  variant="subtitle1"
                                  style={{ color: "black" }}
                                >
                                  {reply.author.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  gutterBottom
                                  style={{ color: "black" }}
                                >
                                  {reply.text}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {reply.createdAt}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </Card>
                <form onSubmit={handleReplySubmit}>
                  <TextField
                    label="Leave a reply"
                    multiline
                    rows={4}
                    className={classes.textField}
                    name="newReply"
                    value={newReply}
                    onChange={handleReplyChange}
                    margin="normal"
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit Reply
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default SupportPage;
