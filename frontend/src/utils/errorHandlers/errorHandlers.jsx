const handleClearErrors = (index, errors, setErrors) => {
  const updatedErrors = [...errors];
  updatedErrors.splice(index, 1);
  setErrors(updatedErrors);
};

const handleClearNestedErrors = (index, setErrors, nestedName) => {
  setErrors((prevErrors) => {
    const updatedErrors = { ...prevErrors };
    const sectionErrors = [...prevErrors[nestedName]];
    sectionErrors.splice(index, 1);
    updatedErrors[nestedName] = sectionErrors;
    return updatedErrors;
  });
};

export { handleClearErrors, handleClearNestedErrors };
