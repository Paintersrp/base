import React from "react";
import { PermContactCalendar as AboutIcon } from "@material-ui/icons";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import HomeIcon from "@mui/icons-material/Home";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import TableViewIcon from "@mui/icons-material/TableView";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InfoIcon from "@mui/icons-material/Info";

export default function mapAppIcon(appName) {
  console.log(appName);
  switch (appName.toLowerCase()) {
    case "authorization":
      return <ShieldSharpIcon />;
    case "articles":
      return <NewspaperSharpIcon />;
    case "landing":
      return <HomeIcon />;
    case "about":
      return <AboutIcon />;
    case "services":
      return <DesignServicesIcon />;
    case "support":
      return <ContactSupportIcon />;
    case "jobs":
      return <WorkSharpIcon />;
    case "general":
      return <SettingsIcon />;
    case "tables":
      return <TableViewIcon />;
    case "quizes":
      return <QuestionAnswerIcon />;
    case "contact":
      return <InfoIcon />;
    default:
      return null;
  }
}
