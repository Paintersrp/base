import React, { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { faqExamplesStyles } from "../examples/styles/faqExampleStyles";

const FAQTabsSkeleton = ({
  contentObject = null,
  subType = "Standard",
  elementType,
}) => {
  const classes = faqExamplesStyles();
  const [currentCategory, setCurrentCategory] = useState();
  const [currentCategorySkeleton, setCurrentCategorySkeleton] = useState(0);
  const [sortedItems, setSortedItems] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleTabChangeSkeleton = (event, newValue) => {
    console.log(newValue);
    setCurrentCategorySkeleton(newValue);
  };
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setCurrentCategory(newValue);
  };

  useEffect(() => {
    if (
      contentObject &&
      elementType === "FAQ" &&
      contentObject.type === "Tabbed"
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
      <div style={{ display: "flex", width: "100%" }}>
        {!sortedItems ? (
          <Tabs
            value={currentCategorySkeleton}
            onChange={handleTabChangeSkeleton}
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              value={0}
              label={
                <Skeleton
                  variant="text"
                  width={"90%"}
                  style={{
                    backgroundColor:
                      currentCategorySkeleton === 0 ? "#616161" : "#212121",
                  }}
                />
              }
              classes={{ root: classes.tab }}
            />
            <Tab
              value={1}
              label={
                <Skeleton
                  variant="text"
                  width={"90%"}
                  style={{
                    backgroundColor:
                      currentCategorySkeleton === 1 ? "#616161" : "#212121",
                  }}
                />
              }
              classes={{ root: classes.tab }}
            />
            <Tab
              value={2}
              label={
                <Skeleton
                  variant="text"
                  width={"90%"}
                  style={{
                    backgroundColor:
                      currentCategorySkeleton === 2 ? "#616161" : "#212121",
                  }}
                />
              }
              classes={{ root: classes.tab }}
            />
          </Tabs>
        ) : (
          <Tabs
            value={currentCategory}
            onChange={handleTabChange}
            classes={{ indicator: classes.tabsIndicator }}
          >
            {categories.map((category) => (
              <Tab
                label={category}
                value={category}
                classes={{ root: classes.tab }}
              />
            ))}
          </Tabs>
        )}
      </div>

      <div className={classes.preview}>
        {sortedItems ? (
          <React.Fragment>
            {sortedItems
              .filter((item) => item.category_data.name === currentCategory)
              .map((item, index) => (
                <Accordion key={sortedItems.indexOf(item)}>
                  <AccordionSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className={classes.heading}>
                      {item.question_data.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails className={classes.details}>
                    <Typography>{item.answer_data.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {[...Array(3)].map((_, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  className={classes.summary}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>
                    <Skeleton variant="text" width={200} />
                  </Typography>
                </AccordionSummary>

                <AccordionDetails className={classes.details}>
                  <Typography>
                    <Skeleton variant="text" width={400} />
                    <Skeleton variant="text" width={300} />
                    <Skeleton variant="text" width={200} />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default FAQTabsSkeleton;
