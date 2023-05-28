import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsIcon from "@mui/icons-material/Collections";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";

export const drawerWidth = 240;

// Generalized Control Options
export const generalControlOptions = [
  {
    text: "Save",
    onClick: () => console.log("Save clicked"),
    icon: <SaveIcon />,
  },
  {
    text: "Restart",
    onClick: () => console.log("Restart clicked"),
    icon: <RestartAltIcon />,
  },
];

// Element Set Options
export const elementSetStepOptions = [
  {
    text: "Details",
    onClick: () => console.log("Details clicked"),
    icon: <DescriptionIcon />,
  },
  {
    text: "Content",
    onClick: () => console.log("Content clicked"),
    icon: <CollectionsIcon />,
  },
  {
    text: "Layout",
    onClick: () => console.log("Layout clicked"),
    icon: <DisplaySettingsIcon />,
  },
  {
    text: "Finalize",
    onClick: () => console.log("Finalize clicked"),
    icon: <DoneAllIcon />,
  },
];

// List Options
export const listStepOptions = [
  {
    text: "Finalize",
    onClick: () => console.log("Finalize clicked"),
    icon: <DoneAllIcon />,
  },
  {
    text: "Layout",
    onClick: () => console.log("Layout clicked"),
    icon: <DisplaySettingsIcon />,
  },
  {
    text: "Content",
    onClick: () => console.log("Content clicked"),
    icon: <CollectionsIcon />,
  },
  {
    text: "Details",
    onClick: () => console.log("Details clicked"),
    icon: <DescriptionIcon />,
  },
];
