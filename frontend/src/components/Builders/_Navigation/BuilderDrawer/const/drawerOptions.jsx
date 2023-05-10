import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsIcon from "@mui/icons-material/Collections";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";

export const drawerWidth = 240;

export const generalDrawerStepOptions = [
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
export const generalDrawerControlOptions = [
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
