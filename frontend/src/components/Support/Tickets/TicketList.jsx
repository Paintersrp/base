import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const TicketList = ({ tickets, onSelect, onDelete }) => {
  return (
    <List>
      {tickets.map((ticket) => (
        <ListItem button onClick={() => onSelect(ticket.id)} key={ticket.id}>
          <ListItemText primary={ticket.title} />
          <button onClick={(e) => onDelete(ticket.id, e)}>Delete</button>
        </ListItem>
      ))}
    </List>
  );
};

export default TicketList;
