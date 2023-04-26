import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  
  Collapse,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { faqItemData } from "../const/faqConstants";
import { faqExamplesStyles } from "./styles/faqExampleStyles";

const FAQList = () => {
  const classes = faqExamplesStyles();
  const [open, setOpen] = useState({});
  const categories = [...new Set(faqItemData.map((faq) => faq.category))];

  useEffect(() => {
    const firstCategory = faqItemData[0].category;
    setOpen((prevState) => ({
      ...prevState,
      [firstCategory]: true,
    }));
  }, []);

  const handleClick = (category) => {
    setOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <List style={{ width: "100%" }}>
      {categories.map((category, index) => (
        <React.Fragment key={category}>
          <ListItem
            button
            onClick={() => handleClick(category)}
            classes={{ root: classes.categoryList }}
          >
            <ListItemText primary={category} />
            <IconButton edge="end" size="small" className={classes.iconButton}>
              {open[category] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[category]} timeout="auto" unmountOnExit>
            {faqItemData
              .filter((item) => item.category === category)
              .map((item, index) => (
                <React.Fragment key={faqItemData.indexOf(item)}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.question}
                        >
                          {item.question}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          gutterBottom
                          className={classes.answer}
                        >
                          {item.answer}
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

export default FAQList;
