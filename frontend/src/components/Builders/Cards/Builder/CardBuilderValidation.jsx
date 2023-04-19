export const validateTileCard = (formData) => {
  let errors = [];

  if (formData.primary === "") {
    errors.push("Primary Text is required for a Tile Card");
  }
  if (formData.secondary === "") {
    errors.push("Secondary Text is required for a Tile Card");
  }
  if (formData.icon === "") {
    errors.push("Icon is required for a Tile Card");
  }

  return errors;
};
export const validateStandardCard = (formData) => {
  let errors = [];

  if (formData.header === "") {
    errors.push("Header is required for a Standard Card");
  }
  if (formData.subheader === "") {
    errors.push("Subheader is required for a Standard Card");
  }
  if (formData.primary === "") {
    errors.push("Primary Text is required for a Standard Card");
  }
  if (formData.icon === "") {
    errors.push("Icon is required for a Standard Card");
  }
  if (formData.image === "") {
    errors.push("Image is required for a Standard Card");
  }

  return errors;
};
export const validateDenseCard = (formData) => {
  let errors = [];

  if (formData.header === "") {
    errors.push("Header is required for a Dense Card");
  }
  if (formData.subheader === "") {
    errors.push("Subheader is required for a Dense Card");
  }
  if (formData.primary === "") {
    errors.push("Primary Text is required for a Dense Card");
  }
  if (formData.secondary === "") {
    errors.push("Secondary Text is required for a Dense Card");
  }
  if (formData.icon === "") {
    errors.push("Icon is required for a Dense Card");
  }

  return errors;
};
export const validateCardDetails = (formData) => {
  let errors = [];

  if (formData.name === "") {
    errors.push("Card Name is required");
  }
  //   if (formData.description === "") {
  //     errors.push("Card Description is required");
  //   }

  return errors;
};
