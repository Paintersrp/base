import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarIcon from "@material-ui/icons/Star";
import Divider from "@material-ui/core/Divider";
import { favExampleData } from "./listExampleData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListExample() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListSubheader>Items</ListSubheader>
        {favExampleData.map((item) => (
          <div key={item.id}>
            <ListItem button>
              <ListItemText primary={item.title} secondary={item.subtitle} />
              {item.favorite && (
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
              )}
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ListExample;
