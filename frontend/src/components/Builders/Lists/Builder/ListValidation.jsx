export const validateListAdd = (formData, listItems) => {
  let errors = [];
  if (formData.primary === "") {
    errors.push("Primary is required");
  }
  if (formData.secondary === "") {
    errors.push("Secondary is required");
  }
  if (formData.order === "") {
    errors.push("Item Order is required");
  } else if (listItems.some((item) => item.order === formData.order)) {
    errors.push(`Item already exists with the order of: ${formData.order}`);
  }
  if (formData.listType === "Icon") {
    if (formData.icon === "") {
      errors.push(`Icon is required for List Type: ${formData.listType}`);
    }
  }
  if (formData.listType === "Image") {
    if (formData.image === "") {
      errors.push(`Thumbnail is required for List Type: ${formData.listType}`);
    }
  }
  return errors;
};

export const validateListSubmit = (listData) => {
    let errors = [];
    if (!listData.name) {
      errors.push("Name is required");
    }
    if (!listData.type) {
      errors.push("Type is required");
    }
    if (!listData.listItems || listData.listItems.length === 0) {
      errors.push("At least one list item is required");
    } else {
      for (let i = 0; i < listData.listItems.length; i++) {
        let item = listData.listItems[i];
        if (!item.primary) {
          errors.push(`Primary is required for item ${i+1}`);
        }
        if (!item.secondary) {
          errors.push(`Secondary is required for item ${i+1}`);
        }
        if (!item.order) {
          errors.push(`Order is required for item ${i+1}`);
        } else if (listData.listItems.some((otherItem) => otherItem.order === item.order && otherItem !== item)) {
          errors.push(`Item already exists with the order of: ${item.order}`);
        }
        if (listData.type === "Icon") {
          if (!item.icon) {
            errors.push(`Icon is required for item ${i+1} with List Type: ${listData.type}`);
          }
        }
        if (listData.type === "Image") {
          if (!item.image) {
            errors.push(`Thumbnail is required for item ${i+1} with List Type: ${listData.type}`);
          }
        }
      }
    }
    return errors;
  }
  
