import QuizIcon from "@mui/icons-material/Quiz";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  PermContactCalendar as AboutIcon,
  Public as LandingIcon,
} from "@material-ui/icons";
import TableViewIcon from "@mui/icons-material/TableView";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export function renderIcon(appName, className) {
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
      return <AboutIcon className={className} style={{ fontSize: "1.5rem" }} />;
    case "services":
      return (
        <DesignServicesIcon
          className={className}
          style={{ fontSize: "1.5rem" }}
        />
      );
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
    case "tables":
      return (
        <TableViewIcon className={className} style={{ fontSize: "1.5rem" }} />
      );
    case "quizes":
      return (
        <QuestionAnswerIcon
          className={className}
          style={{ fontSize: "1.5rem" }}
        />
      );
    case "contact":
      return <InfoIcon className={className} style={{ fontSize: "1.5rem" }} />;
    default:
      return null;
  }
}
