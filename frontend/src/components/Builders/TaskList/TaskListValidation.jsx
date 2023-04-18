export const validateSectionAdd = (formData, sections) => {
  let errors = [];
  if (formData.title === "") {
    errors.push("Title is required");
  } else if (sections.some((section) => section.title === formData.title)) {
    errors.push(`Section already exists with the title: ${formData.title}`);
  }
  return errors;
};
export const validateListDetails = (formData) => {
  let errors = [];
  if (formData.title === "") {
    errors.push("Title is required");
  }
  return errors;
};

export const validateTaskAdd = (formData, sectionName, sections) => {
  let errors = [];
  if (formData.title === "") {
    errors.push("Title is required");
  }
  if (formData.section === "") {
    errors.push("Section is required");
  }
  if (formData.priority === "") {
    errors.push("Priority is required");
  }
  const sectionIndex = sections.findIndex(
    (section) => section.title === sectionName
  );
  const tasks = sections[sectionIndex].tasks;
  if (tasks.some((task) => task.title === formData.title)) {
    errors.push(`Task already exists with the title: ${formData.title}`);
  }
  return errors;
};

export const validateListSave = (listFormData, sections) => {
    let errors = [];
    if (listFormData.title === "") {
      errors.push("Title is required");
    }
    sections.forEach((section, sectionIndex) => {
      if (section.title === "") {
        errors.push(`Title is required for Section ${sectionIndex + 1}`);
      }
      if (section.description === "") {
        errors.push(`Description is required for Section ${sectionIndex + 1}`);
      }
      section.tasks.forEach((item, itemIndex) => {
        if (item.title === "") {
          errors.push(
            `Title is required for Item ${itemIndex + 1} in Section ${
              sectionIndex + 1
            }`
          );
        }
        if (item.description === "") {
          errors.push(
            `Description is required for Item ${itemIndex + 1} in Section ${
              sectionIndex + 1
            }`
          );
        }
        if (item.priority === "") {
          errors.push(
            `Priority is required for Item ${itemIndex + 1} in Section ${
              sectionIndex + 1
            }`
          );
        }
      });
    });
    return errors;
  };
  
