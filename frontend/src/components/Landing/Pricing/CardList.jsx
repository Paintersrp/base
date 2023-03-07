import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function CardList({ data, classes }) {
  return (
    <List className={classes.pricingFeatures}>
      {data.features.map((feature, index) => (
        <ListItem key={`feature-${index}`} className={classes.detail}>
          <CheckIcon className={classes.checkIcon} />
          {feature.detail}
        </ListItem>
      ))}
    </List>
  );
}
