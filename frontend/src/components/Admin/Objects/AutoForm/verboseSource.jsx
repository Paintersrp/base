const verboseSource = (fieldName, item) => {
  switch (fieldName) {
    case "components":
    case "elements":
      return `${item.name} (${item.content_type})`;
    case "supported_sites":
    case "features":
    case "requirements":
    case "responsibilities":
    case "tags":
      return item.detail;
    case "rows":
      return `${item.detail} (${item.table_name})`;
    default:
      return item.id;
  }
};

export default verboseSource;
