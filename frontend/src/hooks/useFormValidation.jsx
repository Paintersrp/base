import { useState } from "react";

const useFormValidation = (initialState, validate, handleSubmitLogin) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name.includes("checkbox")) {
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
      console.log("DONE");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    console.log("ERRORS: ", validate(values));
    if (Object.keys(validate(values)).length !== 0) {
      return;
    }

    handleSubmitLogin(event);
  };

  const resetForm = (reset) => {
    setValues(reset);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
