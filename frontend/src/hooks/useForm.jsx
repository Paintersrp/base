export default function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
