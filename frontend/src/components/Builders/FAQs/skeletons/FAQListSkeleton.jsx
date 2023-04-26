import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { faqExamplesStyles } from "../examples/styles/faqExampleStyles";

const FAQListSkeleton = () => {
  const classes = faqExamplesStyles();
  const [open, setOpen] = useState({ 0: true, 1: false, 2: false });

  const handleClick = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <List style={{ width: "90%" }}>
      {[...Array(3)].map((_, index) => (
        <React.Fragment key={index}>
          <ListItem
            onClick={() => handleClick(index)}
            classes={{ root: classes.categoryList }}
          >
            <ListItemText primary={<Skeleton width="80%" />} />
            <IconButton edge="end" size="small" className={classes.iconButton}>
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            {[...Array(2)].map((_, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.question}
                      >
                        <Skeleton width="80%" />
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body1"
                        gutterBottom
                        className={classes.answer}
                      >
                        <Skeleton />
                        <Skeleton />
                      </Typography>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default FAQListSkeleton;
