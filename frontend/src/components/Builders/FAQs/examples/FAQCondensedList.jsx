import React, { useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { faqItemData } from "../const/faqConstants";
import { faqExamplesStyles } from "./styles/faqExampleStyles";

const FAQCondensedList = () => {
  const classes = faqExamplesStyles();
  const [currentCategory, setCurrentCategory] = useState(
    faqItemData[0].category
  );

  const handleListItemClick = (category) => {
    setCurrentCategory(category);
  };

  const categories = [...new Set(faqItemData.map((faq) => faq.category))];

  return (
    <React.Fragment>
      <List style={{ width: "100%" }}>
        {categories.map((category) => (
          <ListItem
            button
            selected={currentCategory === category}
            onClick={() => handleListItemClick(category)}
            classes={{
              root: classes.categoryList,
              selected: classes.selectedCategory,
            }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>

      <div style={{ width: "100%" }}>
        {faqItemData
          .filter((item) => item.category === currentCategory)
          .map((item, index) => (
            <React.Fragment key={faqItemData.indexOf(item)}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.question}
              >
                {item.question}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className={classes.answer}
              >
                {item.answer}
              </Typography>
            </React.Fragment>
          ))}
      </div>
    </React.Fragment>
  );
};

export default FAQCondensedList;
