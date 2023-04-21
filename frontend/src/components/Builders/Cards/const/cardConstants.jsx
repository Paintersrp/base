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

export const layoutOptions = [
  { value: "option1", label: "Tile" },
  { value: "option2", label: "Standard" },
  { value: "option3", label: "Dense" },
];

export const fieldNames = [
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
