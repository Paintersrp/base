import { Typography } from "@material-ui/core";
import QuizIcon from "@mui/icons-material/Quiz";
import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import InfoIcon from "@mui/icons-material/Info";
import DeskIcon from "@mui/icons-material/Desk";
import ApiSharpIcon from "@mui/icons-material/ApiSharp";
import DiamondSharpIcon from "@mui/icons-material/DiamondSharp";
import ContactMailSharpIcon from "@mui/icons-material/ContactMailSharp";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import SettingsIcon from "@mui/icons-material/Settings";

export function renderIcon(appName, className) {
  console.log(appName);
  switch (appName) {
    case "articles":
      return (
        <NewspaperSharpIcon
          className={className}
          style={{ fontSize: "1.55rem" }}
        />
      );
    case "landing":
      return <HomeIcon className={className} style={{ fontSize: "1.5rem" }} />;
    case "about":
      return <InfoIcon className={className} style={{ fontSize: "1.5rem" }} />;
    case "services":
      return <QuizIcon className={className} style={{ fontSize: "1.5rem" }} />;
    case "support":
      return (
        <ContactSupportSharpIcon
          className={className}
          style={{ fontSize: "1.5rem" }}
        />
      );
    case "jobs":
      return (
        <WorkSharpIcon className={className} style={{ fontSize: "1.5rem" }} />
      );
    case "general":
      return (
        <SettingsIcon className={className} style={{ fontSize: "1.5rem" }} />
      );
    default:
      return null;
  }
}
