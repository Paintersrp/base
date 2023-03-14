import React from "react";
import {
  Dashboard as GeneralIcon,
  Work as JobsIcon,
  PermContactCalendar as AboutIcon,
  Public as LandingIcon,
} from "@material-ui/icons";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";

export default function mapAppIcon(appName) {
  switch (appName.toLowerCase()) {
    case "articles":
      return <NewspaperSharpIcon />;
    case "landing":
      return <LandingIcon />;
    case "about":
      return <AboutIcon />;
    case "services":
      return <StyleSharpIcon />;
    case "support":
      return <ContactSupportIcon />;
    case "jobs":
      return <JobsIcon />;
    case "general":
      return <GeneralIcon />;
    default:
      return null;
  }
}
