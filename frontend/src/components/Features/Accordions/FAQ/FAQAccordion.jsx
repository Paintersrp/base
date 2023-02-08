import React, { useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import faqData from "./faqData";
import { Grid } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import AccordionQA from "../AccordionQA";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "black",
    padding: theme.spacing(1),
    width: 900,
  },
  containergrid: {
    display: "flex",
    width: "100vw",
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    backgroundColor: "#666666",
    color: "black",
    fontWeight: "700",
    fontFamily: "Poppins",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
    "&:focus": {
      color: "black",
    },
    "&: .MuiTab-textColorInherit.Mui-selected": {
      color: "black",
    },
  },
  tabsIndicator: {
    width: "100%",
    backgroundColor: "white",
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    textAlign: "left",
    color: "black",
  },
}));

const FAQAccordion = () => {
  const classes = useStyles();

  const [currentCategory, setCurrentCategory] = useState("Shipping");

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <>
      <div className={classes.containergrid}>
        <Grid container spacing={0} className={classes.containergrid}>
          <Paper elevation={0} className={classes.root}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Frequently Asked Questions
            </Typography>
            <Tabs
              value={currentCategory}
              onChange={handleTabChange}
              classes={{ indicator: classes.tabsIndicator }}
            >
              {Object.keys(faqData).map((category) => (
                <Tab
                  label={category}
                  value={category}
                  classes={{ root: classes.tab }}
                />
              ))}
            </Tabs>
            <Grid container spacing={0} style={{ marginTop: 5 }}>
              {faqData[currentCategory].map((faq) => (
                <Grid item xs={12}>
                  <AccordionQA faq={faq} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default FAQAccordion;
