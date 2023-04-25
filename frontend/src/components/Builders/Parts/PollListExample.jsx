import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";

import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
} from "@material-ui/core";

import Text from "../../Elements/Layout/Text/Text";

import { favExampleData } from "../Lists/utils/listExampleData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function PollingListExample() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ padding: 0 }}
      >
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

      <Text mt={8} mb={0} a="c" t="h4">
        Add Submit
      </Text>
      <Text mt={8} mb={0} a="c" t="h4">
        Star on Choice
      </Text>
    </div>
  );
}

export default PollingListExample;
