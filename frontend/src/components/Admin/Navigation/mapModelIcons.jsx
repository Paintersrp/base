import React from "react";
import {
  Dashboard as GeneralIcon,
  Work as JobsIcon,
  PermContactCalendar as AboutIcon,
  Public as LandingIcon,
} from "@material-ui/icons";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArticleIcon from "@mui/icons-material/Article";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function mapAppIcon(appName) {
  switch (appName.toLowerCase()) {
    case "articles":
      return <ArticleIcon />;
    case "landing":
      return <LandingIcon />;
    case "about":
      return <AboutIcon />;
    case "services":
      return <BuildCircleIcon />;
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
