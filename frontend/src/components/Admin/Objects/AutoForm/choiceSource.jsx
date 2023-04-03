const choiceSource = (fieldName) => {
  switch (fieldName) {
    case "components":
      return "componentmin";
    case "supported_sites":
      return "supportedsites";
    case "features":
      return "feature";
    case "rows":
      return "servicecomparerows";
    default:
      return fieldName;
  }
};

export default choiceSource;
