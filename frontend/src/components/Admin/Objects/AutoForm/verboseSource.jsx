const verboseSource = (fieldName, item) => {
  switch (fieldName) {
    case "components":
    case "elements":
      return `${item.name} (${item.content_type})`;
    case "items":
      return `${item.name} (Tag: ${item.tag_details.name})`;
    case "supported_sites":
    case "features":
    case "requirements":
    case "responsibilities":
    case "tags":
      return item.detail;
    case "processes":
      return `${item.title} (${item.id})`;
    case "latest_articles":
      return `${item.title}`;
    case "rows":
      return `${item.detail} (${item.table_name})`;
    default:
      return item.id;
  }
};

export default verboseSource;
