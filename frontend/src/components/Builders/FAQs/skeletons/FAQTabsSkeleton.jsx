import React, { useState } from "react";
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

const FAQTabsSkeleton = () => {
  const classes = faqExamplesStyles();
  const [currentCategory, setCurrentCategory] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <div style={{ width: "90%" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Tabs
          value={currentCategory}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          classes={{ indicator: classes.tabsIndicator }}
        >
          <Tab value={0} label={<Skeleton variant="text" width={100} />} />
          <Tab value={1} label={<Skeleton variant="text" width={100} />} />
          <Tab value={2} label={<Skeleton variant="text" width={100} />} />
        </Tabs>
      </div>

      <div className={classes.preview}>
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
      </div>
    </div>
  );
};

export default FAQTabsSkeleton;
