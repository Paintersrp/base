import QuizIcon from "@mui/icons-material/Quiz";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";
import SettingsIcon from "@mui/icons-material/Settings";

export function renderIcon(appName, className) {
  console.log(appName);
  switch (appName) {
    case "authorization":
      return (
        <ShieldSharpIcon className={className} style={{ fontSize: "1.5rem" }} />
      );
    case "articles":
      return (
        <NewspaperSharpIcon
          className={className}
          style={{ fontSize: "1.5rem" }}
        />
      );
    case "landing":
      return <HomeIcon className={className} style={{ fontSize: "1.5rem" }} />;
    case "InfoIcon":
      return <InfoIcon className={className} style={{ fontSize: "1.5rem" }} />;
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
