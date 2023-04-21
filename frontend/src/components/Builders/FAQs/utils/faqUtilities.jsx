export function resetFaqFormData(formData) {
  return {
    name: formData.name,
    description: formData.description,
    question: "",
    answer: "",
    category: "",
    order: "",
  };
}
export function editFaqFormData(formData, itemToEdit) {
  return {
    ...formData,
    question: itemToEdit.question,
    answer: itemToEdit.answer,
    category: itemToEdit.category,
    order: itemToEdit.order,
  };
}
