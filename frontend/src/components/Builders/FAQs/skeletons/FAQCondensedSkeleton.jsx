import React, { useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { faqExamplesStyles } from "../examples/styles/faqExampleStyles";

const FAQCondensedSkeleton = () => {
  const classes = faqExamplesStyles();
  const categories = ["Category 1", "Category 2", "Category 3"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleListItemClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ width: "90%" }}>
      <List style={{ width: "100%" }}>
        {categories.map((category, index) => (
          <ListItem
            key={index}
            selected={currentIndex === index}
            classes={{
              root: classes.categoryList,
              selected: classes.selectedCategory,
            }}
            onClick={() => handleListItemClick(index)}
          >
            <Skeleton variant="rect" width={200} height={30} />
          </ListItem>
        ))}
      </List>

      <div style={{ width: "100%" }}>
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
      </div>
    </div>
  );
};

export default FAQCondensedSkeleton;
