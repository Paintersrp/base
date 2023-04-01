const verboseSource = (fieldName, item) => {
  switch (fieldName) {
    case "components":
      return item.name;
    case "supported_sites":
    case "features":
    case "requirements":
    case "responsibilities":
      return item.detail;
    case "rows":
      return `${item.detail} (${item.table_name})`;
    default:
      return null;
  }
};

export default verboseSource;
