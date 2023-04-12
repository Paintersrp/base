import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { avatarExampleData } from "./listExampleData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function AvatarListExample() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListSubheader>Users</ListSubheader>
        {avatarExampleData.map((item) => (
          <div key={item.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt={item.title}
                  src={item.avatar}
                  className={classes.avatar}
                />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.subtitle} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default AvatarListExample;
