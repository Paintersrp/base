import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    overflow: "hidden",
  },
  listItem: {
    padding: theme.spacing(1, 2),
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  listItemIcon: {
    marginRight: theme.spacing(2),
  },
  primaryText: {
    marginBottom: theme.spacing(1),
  },
}));

const ListSkeleton = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {[...Array(2)].map((_, index) => (
        <ListItem key={index} className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Skeleton variant="circle" width={40} height={40} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Skeleton
                variant="text"
                width={200}
                className={classes.primaryText}
              />
            }
            secondary={<Skeleton variant="text" width={100} />}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListSkeleton;
