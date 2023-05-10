import React, { useEffect, useState } from "react";
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

const FAQListSkeleton = ({ contentObject = null, subType, elementType }) => {
  const classes = faqExamplesStyles();
  const [open, setOpen] = useState({ 0: true, 1: false, 2: false });
  const [openData, setOpenData] = useState({});
  const [currentCategory, setCurrentCategory] = useState();
  const [sortedItems, setSortedItems] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleClick = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleClick2 = (category) => {
    setOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  useEffect(() => {
    if (
      contentObject &&
      elementType === "FAQ" &&
      contentObject.type === "List"
    ) {
      const sorted = contentObject.question_sets.sort(
        (a, b) => a.order - b.order
      );

      setSortedItems(sorted);

      const newCategories = [
        ...new Set(
          contentObject.question_sets.map((faq) => faq.category_data.name)
        ),
      ];
      console.log("newCategories", newCategories);
      setCategories(newCategories);

      setOpen((prevState) => ({
        ...prevState,
        [newCategories[0]]: true,
      }));
    }
  }, [contentObject]);

  return (
    <List style={{ width: "90%" }}>
      {sortedItems ? (
        <React.Fragment>
          {categories.map((category, index) => (
            <React.Fragment key={category}>
              <ListItem
                button
                onClick={() => handleClick2(category)}
                classes={{ root: classes.categoryList }}
              >
                <ListItemText primary={category} />
                <IconButton
                  edge="end"
                  size="small"
                  className={classes.iconButton}
                >
                  {open[category] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <Collapse
                in={open[category]}
                timeout="auto"
                unmountOnExit
                style={{
                  marginBottom: index === 0 ? (open[category] ? 8 : 0) : 0,
                }}
              >
                {sortedItems
                  .filter((item) => item.category_data.name === category)
                  .map((item, index) => (
                    <React.Fragment key={sortedItems.indexOf(item)}>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={classes.question}
                            >
                              {item.question_data.question}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body1"
                              gutterBottom
                              className={classes.answer}
                            >
                              {item.answer_data.answer}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
              </Collapse>
            </React.Fragment>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {[...Array(3)].map((_, index) => (
            <React.Fragment key={index}>
              <ListItem
                onClick={() => handleClick(index)}
                classes={{ root: classes.categoryList }}
              >
                <ListItemText primary={<Skeleton width="80%" />} />
                <IconButton
                  edge="end"
                  size="small"
                  className={classes.iconButton}
                >
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <Collapse
                in={open[index]}
                timeout="auto"
                unmountOnExit
                style={{
                  marginBottom: open[index] ? 8 : 0,
                }}
              >
                {[...Array(2)].map((_, index) => (
                  <React.Fragment key={index}>
                    <ListItem className={classes.listItem}>
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
        </React.Fragment>
      )}
    </List>
  );
};

export default FAQListSkeleton;
