import { headerFields } from "../const/elementSetConstants";

export const getFieldsByType = (type, subType) => {
  switch (type) {
    case "Header":
      switch (subType) {
        case "Page (H1)":
        case "Page (H2)":
          return headerFields.filter((_, index) => index !== 5);
        case "Content (H3)":
        case "Content (H4)":
        case "Section (H5)":
        case "Section (H6)":
          return headerFields;
        default:
          return [headerFields[0], headerFields[1], headerFields[2]];
      }
    case "Element":
      switch (subType) {
        case "Type 1":
          return [textFields[0], textFields[1], textFields[2]];
        case "Type 2":
          return [textFields[0], textFields[1], textFields[3], textFields[4]];
        default:
          return [textFields[0], textFields[1], textFields[2], textFields[3]];
      }
    default:
      return [];
  }
};
