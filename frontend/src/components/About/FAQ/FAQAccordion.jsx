import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import AccordionQA from "./AccordionQA";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import FAQEdit from "./FAQEdit";
import { useSelector } from "react-redux";
import EditButton from "../../Elements/Buttons/EditButton";
import DeleteButton from "../../Elements/Buttons/DeleteButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "black",
    padding: theme.spacing(1),
    width: "100%",
  },
  containerLayout: {
    display: "flex",
    width: "100vw",
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerGrid: {
    display: "flex",
    maxWidth: 900,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontWeight: "700",
    fontFamily: "Poppins",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
    "&:focus": {
      color: "white",
    },
    "&: .MuiTab-textColorInherit.Mui-selected": {
      color: "white",
    },
  },
  tabsIndicator: {
    width: "100%",
    backgroundColor: "white",
    borderBottom: `3px solid ${theme.palette.secondary.dark}`,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    textAlign: "left",
    color: "black",
  },
  editContainer: {
    maxWidth: 370,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
    },
  },
}));

const FAQAccordion = () => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);

  const onUpdate = () => {
    console.log("test");
    axiosInstance
      .get("/faqs/")
      .then((response) => {
        let updatedFaqData = {};
        response.data.forEach((faq) => {
          if (!updatedFaqData[faq.category_name]) {
            updatedFaqData[faq.category_name] = [faq];
          } else {
            updatedFaqData[faq.category_name].push(faq);
          }
        });
        setFaqs(updatedFaqData);
        setCategories(Object.keys(updatedFaqData));
        setCurrentCategory(Object.keys(updatedFaqData)[0]);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/faqs/")
        .then((response) => {
          let updatedFaqData = {};
          response.data.forEach((faq) => {
            if (!updatedFaqData[faq.category_name]) {
              updatedFaqData[faq.category_name] = [faq];
            } else {
              updatedFaqData[faq.category_name].push(faq);
            }
          });
          setFaqs(updatedFaqData);
          setCategories(Object.keys(updatedFaqData));
          setCurrentCategory(Object.keys(updatedFaqData)[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <>
      <div className={classes.containerLayout}>
        <Grid container spacing={0} className={classes.containerGrid}>
          <Paper elevation={0} className={classes.root}>
            <>
              <Typography variant="h3" className={classes.sectionTitle}>
                Frequently Asked Questions
              </Typography>
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
              <Grid
                container
                spacing={0}
                style={{ marginTop: 5, width: "100%" }}
              >
                {faqs[currentCategory]
                  ? faqs[currentCategory].map((faq) => (
                      <Grid item xs={12}>
                        <AccordionQA onUpdate={onUpdate} faq={faq} />
                      </Grid>
                    ))
                  : null}
              </Grid>
            </>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default FAQAccordion;
