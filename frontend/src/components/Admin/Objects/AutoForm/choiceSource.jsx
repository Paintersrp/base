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
    case "pages":
      return "pageobj";
    case "page_set":
      return "pageset";
    default:
      return fieldName;
  }
};

export default choiceSource;
