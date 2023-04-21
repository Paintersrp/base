export function resetListItemFormData(formData) {
  return {
    ...formData,
    primary: "",
    secondary: "",
    icon: "",
    order: "",
    image: "",
  };
}
export function editListItemFormData(formData, itemToEdit) {
  return {
    ...formData,
    primary: itemToEdit.primary,
    secondary: itemToEdit.secondary,
    icon: itemToEdit.icon,
    order: itemToEdit.order,
    image: itemToEdit.image,
  };
}
