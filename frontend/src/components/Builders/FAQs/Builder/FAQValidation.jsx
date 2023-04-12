export const validateFAQAdd = (formData, faqItems) => {
  let errors = [];

  if (formData.category === "") {
    errors.push("Question Category is required");
  }
  if (formData.question === "") {
    errors.push("Set Question is required");
  }
  if (formData.answer === "") {
    errors.push("Set Answer is required");
  }
  if (formData.order === "") {
    errors.push("Item Order is required");
  } else {
    const filteredItems = faqItems.filter(
      (item) => item.category === formData.category
    );
    const existingOrder = filteredItems.some(
      (item) => item.order === formData.order
    );

    if (formData.category === "" && formData.order !== "") {
      errors.push("Category must be set to add an order");
    } else if (existingOrder) {
      errors.push(
        `Item already exists in category with the order of: ${formData.order}`
      );
    } else if (formData.category !== "" && !existingOrder) {
      // if category exists and the order is not within that category, do nothing
    }
  }

  return errors;
};

export const validateFAQSubmit = (faqData) => {
  let errors = [];
  if (!faqData.name) {
    errors.push("Name is required");
  }
  if (!faqData.faqItems || faqData.faqItems.length === 0) {
    errors.push("At least one list item is required");
  } else {
    for (let i = 0; i < faqData.faqItems.length; i++) {
      let item = faqData.faqItems[i];
      if (!item.category) {
        errors.push(`Question Category is required for item ${i + 1}`);
      }
      if (!item.question) {
        errors.push(`Question is required for item ${i + 1}`);
      }
      if (!item.Answer) {
        errors.push(`Answer is required for item ${i + 1}`);
      }
    }
  }
  return errors;
};
