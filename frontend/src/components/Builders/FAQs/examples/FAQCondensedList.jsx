import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { faqItemData } from "../const/faqConstants";

const useStyles = makeStyles((theme) => ({
  categoryList: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    fontWeight: "700",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
  },
  question: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  answer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },
}));

const FAQCondensedList = () => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState(
    faqItemData[0].category
  );

  const handleListItemClick = (event, category) => {
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
            onClick={(event) => handleListItemClick(event, category)}
            classes={{ root: classes.categoryList }}
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
