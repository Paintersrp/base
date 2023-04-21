export const validateDetailsSet = (formData) => {
  let errors = [];

  if (formData.name === "") {
    errors.push("Element Set Name is required");
  }

  return errors;
};
