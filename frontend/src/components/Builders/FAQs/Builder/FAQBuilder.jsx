import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import { validateFAQAdd, validateFAQSubmit } from "./FAQValidation";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import FAQBuilderForm from "./FAQBuilderForm";
import FAQBuilderPreview from "./FAQBuilderPreview";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
}));

const FAQBuilder = () => {
  const initialState = {
    name: "",
    description: "",
    question: "",
    answer: "",
    category: "",
    order: "",
  };
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [faqItems, setFaqItems] = useState([]);
  const [errors, setErrors] = useState("");
  const [apiErrors, setApiErrors] = useState("");

  const handleAddFAQ = (event) => {
    event.preventDefault();
    let errors = validateFAQAdd(formData, faqItems);
    setErrors(errors);
    if (errors.length > 0) {
      return;
    }

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
      description: formData.description,
      question: "",
      answer: "",
      category: "",
      order: "",
    });
    console.log(updatedFaqData);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "order" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (event) => {
    setApiErrors("");
    event.preventDefault();

    const faqData = {
      name: formData.name,
      faqItems: faqItems.map((item) => ({
        question: {
          name: `${formData.name}-${item.category}-Ques-${uuidv4()}`,
          question: item.question,
        },
        answer: {
          name: `${formData.name}-${item.category}-Ans-${uuidv4()}`,
          answer: item.answer,
        },
        question_set: {
          name: `${formData.name}-${item.category}-Set-${uuidv4()}`,
          category: item.category,
          order: item.order,
        },
        name: formData.name,
      })),
    };

    let errors = validateFAQSubmit(faqData);
    setApiErrors(errors);
    if (errors.length > 0) {
      return;
    }
    console.log("Submitted: ", faqData);

    try {
      const response = await axiosInstance
        .post("/faq-builder/", faqData)
        .then((response) => {
          setErrors("");
          setFaqItems([]);
          setFormData(initialState);
        });
    } catch (error) {
      setApiErrors(error.response.data);
    }
  };

  const handleClear = () => {
    setFormData({
      name: formData.name,
      description: formData.description,
      question: "",
      answer: "",
      category: "",
      order: "",
    });
  };
  const handleClearFAQ = () => {
    setFormData({
      ...formData,
      name: "",
      description: "",
    });
  };

  const handleEdit = (index) => {
    const itemToEdit = faqItems[index];

    setFormData({
      ...formData,
      question: itemToEdit.question,
      answer: itemToEdit.answer,
      category: itemToEdit.category,
      order: itemToEdit.order,
    });
    confirmedDelete(itemToEdit);
  };

  const handleClearItems = () => {
    setFaqItems([]);
  };

  const handleClearApiErrors = (index) => {
    const updatedApiErrors = [...apiErrors];
    updatedApiErrors.splice(index, 1);
    setApiErrors(updatedApiErrors);
  };

  const handleClearErrors = (index) => {
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const confirmedDelete = (item) => {
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

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h1" align="center">
          Create FAQ
        </Typography>
        <Grid container style={{ marginTop: 32 }}>
          <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
            <FAQBuilderForm
              formData={formData}
              handleChange={handleChange}
              handleClear={handleClear}
              handleClearFAQ={handleClearFAQ}
              handleAddFAQ={handleAddFAQ}
              errors={errors}
              handleClearErrors={handleClearErrors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FAQBuilderPreview
              formData={formData}
              faqItems={faqItems}
              currentCategory={currentCategory}
              handleTabChange={handleTabChange}
              categories={categories}
              confirmedDelete={confirmedDelete}
              handleEdit={handleEdit}
              handleSubmit={handleSubmit}
              handleClearItems={handleClearItems}
              apiErrors={apiErrors}
              handleClearApiErrors={handleClearApiErrors}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default FAQBuilder;
