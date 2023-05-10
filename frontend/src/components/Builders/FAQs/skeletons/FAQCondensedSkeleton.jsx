import React, { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { faqExamplesStyles } from "../examples/styles/faqExampleStyles";

const FAQCondensedSkeleton = ({
  contentObject = null,
  subType,
  elementType,
}) => {
  const classes = faqExamplesStyles();
  const [sortedItems, setSortedItems] = useState(null);
  const [categories, setCategories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexListItemClick = (index) => {
    setCurrentIndex(index);
  };

  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryListItemClick = (category) => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (
      contentObject &&
      elementType === "FAQ" &&
      (contentObject.type === "Condensed" || !subType)
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
      setCategories(newCategories);
      setCurrentCategory(newCategories[0]);
    }
  }, [contentObject]);

  return (
    <div style={{ width: "90%" }}>
      <List style={{ width: "100%" }}>
        {categories.map((category, index) => (
          <ListItem
            key={index}
            selected={
              !sortedItems
                ? currentIndex === index
                : currentCategory === category
            }
            classes={{
              root: classes.categoryList,
              selected: classes.selectedCategory,
            }}
            onClick={
              !sortedItems
                ? () => handleIndexListItemClick(index)
                : () => handleCategoryListItemClick(category)
            }
          >
            {!sortedItems ? (
              <Skeleton variant="rect" width={200} height={30} />
            ) : (
              <ListItemText primary={category} />
            )}
          </ListItem>
        ))}
      </List>

      <div style={{ width: "100%" }}>
        {!sortedItems ? (
          <React.Fragment>
            {currentIndex === 0 ? (
              <React.Fragment>
                {[...Array(3)].map((_, index) => (
                  <React.Fragment key={index}>
                    <Skeleton variant="text" width={"100%"} height={50} />
                    <Skeleton variant="text" width={"100%"} height={20} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ) : currentIndex === 1 ? (
              <React.Fragment>
                {[...Array(2)].map((_, index) => (
                  <React.Fragment key={index}>
                    <Skeleton variant="text" width={"100%"} height={50} />
                    <Skeleton variant="text" width={"100%"} height={20} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {[...Array(1)].map((_, index) => (
                  <React.Fragment key={index}>
                    <Skeleton variant="text" width={"100%"} height={50} />
                    <Skeleton variant="text" width={"100%"} height={20} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {sortedItems
              .filter((item) => item.category_data.name === currentCategory)
              .map((item, index) => {
                return (
                  <React.Fragment key={sortedItems.indexOf(item)}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.question}
                    >
                      {item.question_data.question}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.answer}
                    >
                      {item.answer_data.answer}
                    </Typography>
                  </React.Fragment>
                );
              })}
            <Typography
              variant="subtitle2"
              align="right"
              style={{ marginTop: 8 }}
            >
              {currentCategory}
            </Typography>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default FAQCondensedSkeleton;
