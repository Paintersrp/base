// Field sets based on element type
export const headerFields = [
  { name: "title", label: "Title Text*", type: "text", md: 12 },
  { name: "subtitle", label: "Subtitle Text (Optional)", type: "text", md: 12 },
  { name: "tagline", label: "Tagline Text (Optional)", type: "text", md: 12 },
  { name: "bottomDivider", label: "Bottom Divider", type: "text", md: 12 },
  { name: "topDivider", label: "Top Divider", type: "text", md: 12 },
];

export const textFields = [
  { name: "title", label: "Title Text*", type: "text", md: 12 },
  { name: "subtitle", label: "Subtitle Text (Optional)", type: "text", md: 12 },
  { name: "tagline", label: "Tagline Text (Optional)", type: "text", md: 12 },
  { name: "bottomDivider", label: "Bottom Divider", type: "text", md: 12 },
  { name: "topDivider", label: "Top Divider", type: "text", md: 12 },
];

export const listFields = [
  { name: "primary", label: "Primary Text*", type: "text", md: 12 },
  { name: "secondary", label: "Secondary Text*", type: "text", md: 12 },
  { name: "order", label: "List Item Order*", type: "number", md: 12 },
  { name: "icon", label: "Icon Choice", type: "text", md: 12 },
  { name: "image", label: "Thumbnail Choice", type: "text", md: 12 },
];

export const cardFields = [
  { name: "header", label: "Header Text*", type: "text", md: 12 },
  { name: "subheader", label: "Subheader Text*", type: "text", md: 12 },
  {
    name: "primary",
    label: "Primary Text*",
    type: "text",
    md: 12,
    multiline: true,
  },
  {
    name: "secondary",
    label: "Secondary Text*",
    type: "text",
    md: 12,
    multiline: true,
  },
  { name: "icon", label: "Icon Choice", type: "text", md: 12 },
  { name: "image", label: "Thumbnail Choice", type: "text", md: 12 },
  { name: "shareToggle", label: "Share Button", type: "text", md: 12 },
  { name: "buttonToggle", label: "Link Button", type: "text", md: 12 },
];

export const subTypes = {
  card: ["Tile", "Standard", "Dense", "Large"],
  list: ["Unordered", "Ordered", "Icon", "Image"],
  text: ["Tile", "Standard", "Dense", "Large"],
  image: ["Tile", "Standard", "Dense", "Large"],
};

export const initialColumnData = {
  header: {
    headerType: "h1",
    alignment: "fs",
    title: "",
    subtitle: "",
    subtitleToggle: true,
    tagline: "",
    taglineToggle: true,
    bottomDivider: "",
  },
  content: {
    contentType: "Text",
    alignment: "fs",
    title: "",
    subtitle: "",
    subtitleToggle: true,
    tagline: "",
    taglineToggle: true,
    bottomDivider: "",
  },
};

export const initialFormData = {
  setType: "",
  setWidth: "",
  setColumns: "",
  name: "",
  description: "",
  icon: "",
  image: "",
  header: "",
  subheader: "",
  primary: "",
  secondary: "",
  order: "",
  shareToggle: false,
  buttonToggle: false,
};

export const initialOpenData = {
  header: {
    colOne: false,
    colTwo: false,
  },
  content: {
    colOne: false,
    colTwo: false,
  },
  layout: {
    colOne: false,
    colTwo: false,
  },
  details: true,
};

export const initialStepOpenData = {
  Details: true,
  Content: false,
  Layout: false,
  Finalize: false,
};

export const initialDetailsData = {
  name: "",
  description: "",
  setWidth: "Full Page",
  setColumns: "1",
};

// export const initialErrorsData = {
//   header: {
//     colOne: "",
//     colTwo: "",
//   },
//   content: {
//     colOne: "",
//     colTwo: "",
//   },
//   layout: {
//     colOne: "",
//     colTwo: "",
//   },
//   details: "",
// };
