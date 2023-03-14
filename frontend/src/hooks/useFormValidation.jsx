import { useState } from "react";

const useFormValidation = (initialState, validate, handleSubmitLogin) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name.includes("checkbox") || name.includes("rememberMe")) {
      setValues({
        ...values,
        [name]: checked,
      });
    } else if (name.includes("resume")) {
      setValues({
        ...values,
        [name]: event.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    console.log(validate(values));
    setIsSubmitting(true);
    if (Object.keys(validate(values)).length !== 0) {
      return errors;
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
