export const headerFields = [
  { name: "title", label: "Title Text*", type: "text", md: 12 },
  { name: "subtitle", label: "Subtitle Text (Optional)", type: "text", md: 12 },
  { name: "tagline", label: "Tagline Text (Optional)", type: "text", md: 12 },
  { name: "bottomDivider", label: "Bottom Divider", type: "text", md: 12 },
  { name: "topDivider", label: "Top Divider", type: "text", md: 12 },
];

export const initialHeaderData = {
  headerType: "h1",
  alignment: "fs",
  title: "",
  subtitle: "",
  subtitleToggle: true,
  tagline: "",
  taglineToggle: true,
  bottomDivider: "",
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
