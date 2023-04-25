// Layout Options Available for the Card Builder
export const cardLayoutOptions = [
  { value: "option1", label: "Tile" },
  { value: "option2", label: "Standard" },
  { value: "option3", label: "Dense" },
  { value: "option4", label: "Larger" },
];

// Initial Card Form Data
export const initialCardData = {
  cardType: "Standard",
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

// Fields available on the Card Builder Form(s)
export const cardFieldNames = [
  { name: "header", label: "Header Text*", type: "text", md: 6 },
  { name: "subheader", label: "Subheader Text*", type: "text", md: 6 },
  {
    name: "primary",
    label: "Primary Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  {
    name: "secondary",
    label: "Secondary Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  { name: "icon", label: "Icon Choice", type: "text", md: 6 },
  { name: "image", label: "Thumbnail Choice", type: "text", md: 12 },
  { name: "shareToggle", label: "Share Button", type: "text", md: 6 },
  { name: "buttonToggle", label: "Link Button", type: "text", md: 6 },
];
