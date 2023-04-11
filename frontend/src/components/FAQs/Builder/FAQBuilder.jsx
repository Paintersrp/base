import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  IconButton,
  AccordionActions,
  Divider,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Delete, Edit } from "@material-ui/icons";
import { Skeleton } from "@mui/material";
import BaseContent from "../../Elements/Base/BaseContent";
import FormField from "../../Elements/Fields/FormField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
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

  skeletonPreview: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  skeletonAccordion: {
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  skeletonDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
  },
}));

const FAQBuilder = () => {
  const initialState = {
    name: "",
    question: "",
    answer: "",
    category: "",
  };
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [faqItems, setFaqItems] = useState([]);

  const handleAddFAQ = () => {
    const newFAQ = { ...formData };
    const updatedFaqData = [...faqItems, newFAQ];
    setFaqItems(updatedFaqData);

    const updatedCategories = [
      ...new Set(updatedFaqData.map((faq) => faq.category)),
    ];
    setCategories(updatedCategories);
    setCurrentCategory(updatedCategories[0]);
    setFormData({
      name: formData.name,
      question: "",
      answer: "",
      category: "",
    });
    console.log(updatedFaqData);
  };

  const handleRemoveFAQ = (item) => {
    const updatedFAQ = [...faqItems];
    const index = updatedFAQ.indexOf(item);
    updatedFAQ.splice(index, 1);
    setFaqItems(updatedFAQ);

    const updatedCategories = [
      ...new Set(updatedFAQ.map((faq) => faq.category)),
    ];
    setCategories(updatedCategories);
    setCurrentCategory(updatedCategories[0]);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h1" align="center">
          Create FAQ
        </Typography>
        <Grid container style={{ marginTop: 32 }}>
          <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
            <BaseContent header="FAQ Builder">
              <div style={{ marginBottom: 12, width: "100%" }}>
                <FormField
                  id="name"
                  label="FAQ Set Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <FormControl style={{ marginBottom: 12, width: "100%" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <MenuItem value="">Select a category</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Payment">Payment</MenuItem>
                  <MenuItem value="Shipping">Shipping</MenuItem>
                </Select>
                <FormHelperText>
                  Select a category for this FAQ Question Set
                </FormHelperText>
              </FormControl>
              <div style={{ marginBottom: 12, width: "100%" }}>
                <FormField
                  id="question"
                  label="Question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }}>
                <FormField
                  fullWidth
                  variant="outlined"
                  id="answer"
                  label="Answer"
                  multiline
                  minRows={3}
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleAddFAQ}
                  disabled={
                    !formData.question || !formData.answer || !formData.category
                  }
                >
                  Add FAQ
                </Button>
              </div>
            </BaseContent>
          </Grid>
          <Grid item xs={12} md={6}>
            <BaseContent fd="column" header="FAQ Preview" subheader="FAQ Name">
              <div style={{ marginTop: 0, marginBottom: 32 }}>
                <Divider />
              </div>
              {faqItems.length > 0 && (
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
              {faqItems.length > 0 ? (
                <div className={classes.preview}>
                  {faqItems
                    .filter((item) => item.category === currentCategory)
                    .map((item, index) => (
                      <Accordion key={faqItems.indexOf(item)}>
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
                          <IconButton
                            onClick={() => handleRemoveFAQ(item)}
                            className={classes.deleteButton}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </div>
              ) : (
                <div className={classes.skeletonPreview}>
                  <Skeleton variant="rectangular">
                    <Tab />
                  </Skeleton>
                  <div className={classes.skeletonAccordion}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={50}
                    />
                    <div className={classes.skeletonDetails}>
                      <Skeleton
                        variant="rectangular"
                        width={"90%"}
                        height={10}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={"80%"}
                        height={10}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={"70%"}
                        height={10}
                      />
                    </div>
                  </div>
                </div>
              )}
            </BaseContent>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default FAQBuilder;
