import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { faqItemData } from "../const/faqConstants";
import { faqExamplesStyles } from "./styles/faqExampleStyles";

const FAQTabs = () => {
  const classes = faqExamplesStyles();
  const [currentCategory, setCurrentCategory] = useState(
    faqItemData[0].category
  );

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  const categories = [...new Set(faqItemData.map((faq) => faq.category))];

  return (
    <React.Fragment>
      <div style={{ display: "flex", width: "100%" }}>
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
      </div>

      <div className={classes.preview}>
        {faqItemData
          .filter((item) => item.category === currentCategory)
          .map((item, index) => (
            <Accordion key={faqItemData.indexOf(item)}>
              <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>
                  {item.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails className={classes.details}>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </React.Fragment>
  );
};

export default FAQTabs;
