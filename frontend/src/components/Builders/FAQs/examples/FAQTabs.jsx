import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { faqItemData } from "../const/faqConstants";

const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    fontWeight: "700",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
    "&:focus": {
      color: theme.palette.background.light,
    },
    "&: .MuiTab-textColorInherit.Mui-selected": {
      color: theme.palette.background.light,
    },
  },
  tabsIndicator: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
  },
  summary: {
    backgroundColor: theme.palette.background.light,
    fontFamily: "Roboto",
    color: "black",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },
  preview: {
    width: "100%",
  },
}));

const FAQTabs = () => {
  const classes = useStyles();
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
