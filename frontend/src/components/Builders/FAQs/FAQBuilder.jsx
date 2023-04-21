import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseBuilder from "../Parts/Layout/BaseBuilder";

import FAQBuilderForm from "./components/Form/FAQBuilderForm";
import FAQBuilderPreview from "./components/Preview/FAQBuilderPreview";
import { initialFormData } from "./const/faqConstants";
import { validateFAQAdd, validateFAQSubmit } from "./utils/faqValidation";
import { editFaqFormData, resetFaqFormData } from "./utils/faqUtilities";

const FAQBuilder = () => {
  const [currentCategory, setCurrentCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
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
    setFormData(resetFaqFormData(formData));
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
    setFormData(resetFaqFormData(formData));
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

    setFormData(editFaqFormData(formData, itemToEdit));
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
    <BaseBuilder header="Create FAQ" headerGutter>
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
    </BaseBuilder>
  );
};

export default FAQBuilder;
