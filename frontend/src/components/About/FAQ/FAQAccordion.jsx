import React, { useEffect, useState } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import faqData from "./faqData";
import { Grid } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import AccordionQA from "./AccordionQA";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import FAQEdit from "./FAQEdit";
import { useSelector } from "react-redux";
import EditButton from "../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "black",
    padding: theme.spacing(1),
    maxWidth: 900,
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
  editContainer: {
    maxWidth: 370,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
    },
  },
}));

const faqData = {};

const FAQAccordion = () => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);

  const updatedFaqData = () => {
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

    setEditing(false);
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

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      <div className={classes.containergrid}>
        <Grid container spacing={0} className={classes.containergrid}>
          <Paper elevation={0} className={classes.root}>
            {!editing ? (
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
                <Grid container spacing={0} style={{ marginTop: 5 }}>
                  {faqs[currentCategory]
                    ? faqs[currentCategory].map((faq) => (
                        <Grid item xs={12}>
                          <AccordionQA faq={faq} />
                        </Grid>
                      ))
                    : null}
                </Grid>
              </>
            ) : (
              <div className={classes.editContainer}>
                <FAQEdit onUpdate={updatedFaqData} />
              </div>
            )}
          </Paper>
          {auth.is_superuser ? (
            <EditButton onEdit={handleEdit} editState={editing} />
          ) : null}
        </Grid>
      </div>
    </>
  );
};

export default FAQAccordion;
