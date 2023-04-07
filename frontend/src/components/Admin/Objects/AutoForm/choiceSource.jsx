const choiceSource = (fieldName) => {
  console.log("fieldName", fieldName);
  switch (fieldName) {
    case "processes":
      return "process";
    case "components":
      return "componentmin";
    case "items":
      return "listelementitem";
    case "supported_sites":
      return "supportedsites";
    case "features":
      return "feature";
    case "requirements":
      return "requirement";
    case "rows":
      return "servicecomparerows";
    case "pages":
      return "pageobj";
    case "page_set":
      return "pageset";
    case "elements":
      return "element";
    case "latest_articles":
      return "articles/highlighted";
    default:
      return fieldName;
  }
};

export default choiceSource;
