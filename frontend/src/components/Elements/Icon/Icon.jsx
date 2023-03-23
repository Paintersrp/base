import {
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaPencilRuler,
  FaBook,
  FaBalanceScale,
  FaCogs,
  FaGlobe,
  FaMedium,
  FaWix,
  FaWordpress,
} from "react-icons/fa";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import {
  IoLogoAngular,
  IoInfiniteSharp,
  IoMedalSharp,
  IoBusinessSharp,
} from "react-icons/io5";
import { GiUpgrade } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import DatasetSharpIcon from "@mui/icons-material/DatasetSharp";
import TableChartIcon from "@mui/icons-material/TableChart";
import TokenSharpIcon from "@mui/icons-material/TokenSharp";
import BusinessIcon from "@mui/icons-material/Business";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Description, Tune, Dashboard } from "@material-ui/icons";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CategoryIcon from "@mui/icons-material/Category";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import StyleIcon from "@mui/icons-material/Style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PeopleIcon from "@mui/icons-material/People";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import TitleIcon from "@mui/icons-material/Title";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import ApprovalIcon from "@mui/icons-material/Approval";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import StarIcon from "@mui/icons-material/Star";
import WebIcon from "@mui/icons-material/Web";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewListIcon from "@mui/icons-material/ViewList";
import ImageIcon from "@mui/icons-material/Image";
import MessageIcon from "@mui/icons-material/Message";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TableRowsIcon from "@mui/icons-material/TableRows";

const Icon = ({ icon, className }) => {
  switch (icon) {
    case "TableRowsIcon":
      return <TableRowsIcon fontSize="2.5rem" className={className} />;
    case "ViewColumnIcon":
      return <ViewColumnIcon fontSize="2.5rem" className={className} />;
    case "SubscriptionsIcon":
      return <SubscriptionsIcon fontSize="2.5rem" className={className} />;
    case "MessageIcon":
      return <MessageIcon fontSize="2.5rem" className={className} />;
    case "ImageIcon":
      return <ImageIcon fontSize="2.5rem" className={className} />;
    case "ViewListIcon":
      return <ViewListIcon fontSize="2.5rem" className={className} />;
    case "BarChartIcon":
      return <BarChartIcon fontSize="2.5rem" className={className} />;
    case "SummarizeIcon":
      return <SummarizeIcon fontSize="2.5rem" className={className} />;
    case "QuickreplyIcon":
      return <QuickreplyIcon fontSize="2.5rem" className={className} />;
    case "QuestionMarkIcon":
      return <QuestionMarkIcon fontSize="2.5rem" className={className} />;
    case "QuizIcon":
      return <QuizIcon fontSize="2.5rem" className={className} />;
    case "AccountTreeIcon":
      return <AccountTreeIcon fontSize="2.5rem" className={className} />;
    case "ReviewsIcon":
      return <ReviewsIcon fontSize="2.5rem" className={className} />;
    case "DesignServicesIcon":
      return <DesignServicesIcon fontSize="2.5rem" className={className} />;
    case "WebIcon":
      return <WebIcon fontSize="2.5rem" className={className} />;
    case "StarIcon":
      return <StarIcon fontSize="2.5rem" className={className} />;
    case "TurnedInIcon":
      return <TurnedInIcon fontSize="2.5rem" className={className} />;
    case "SubtitlesIcon":
      return <SubtitlesIcon fontSize="2.5rem" className={className} />;
    case "ApprovalIcon":
      return <ApprovalIcon fontSize="2.5rem" className={className} />;
    case "JoinFullIcon":
      return <JoinFullIcon fontSize="2.5rem" className={className} />;
    case "TitleIcon":
      return <TitleIcon fontSize="2.5rem" className={className} />;
    case "FindInPageIcon":
      return <FindInPageIcon fontSize="2.5rem" className={className} />;
    case "PeopleIcon":
      return <PeopleIcon fontSize="2.5rem" className={className} />;
    case "ConnectWithoutContactIcon":
      return (
        <ConnectWithoutContactIcon fontSize="2.5rem" className={className} />
      );
    case "AvTimerIcon":
      return <AvTimerIcon fontSize="2.5rem" className={className} />;
    case "ContactMailIcon":
      return <ContactMailIcon fontSize="2.5rem" className={className} />;
    case "AppBlockingIcon":
      return <AppBlockingIcon fontSize="2.5rem" className={className} />;
    case "DisplaySettingsIcon":
      return <DisplaySettingsIcon fontSize="2.5rem" className={className} />;
    case "AccountCircleIcon":
      return <AccountCircleIcon fontSize="2.5rem" className={className} />;
    case "StyleIcon":
      return <StyleIcon fontSize="2.5rem" className={className} />;
    case "NewspaperIcon":
      return <NewspaperIcon fontSize="2.5rem" className={className} />;
    case "CategoryIcon":
      return <CategoryIcon fontSize="2.5rem" className={className} />;
    case "QuestionAnswerIcon":
      return <QuestionAnswerIcon fontSize="2.5rem" className={className} />;
    case "JoinInnerIcon":
      return <JoinInnerIcon fontSize="2.5rem" className={className} />;
    case "Tune":
      return <Tune fontSize="2.5rem" className={className} />;
    case "Dashboard":
      return <Dashboard fontSize="2.5rem" className={className} />;
    case "Description":
      return <Description fontSize="2.5rem" className={className} />;
    case "WorkHistoryIcon":
      return <WorkHistoryIcon fontSize="2.5rem" className={className} />;
    case "BusinessIcon":
      return <BusinessIcon fontSize="2.5rem" className={className} />;
    case "TokenSharpIcon":
      return <TokenSharpIcon fontSize="2.5rem" className={className} />;
    case "FaWordpress":
      return <FaWordpress fontSize="2.5rem" className={className} />;
    case "FaMedium":
      return <FaMedium fontSize="2.5rem" className={className} />;
    case "FaWix":
      return <FaWix fontSize="2.5rem" className={className} />;
    case "DatasetSharp":
      return <DatasetSharpIcon fontSize="2.5rem" className={className} />;
    case "TableChartIcon":
      return <TableChartIcon fontSize="2.5rem" className={className} />;
    case "FaUser":
      return <FaUser className={className} />;
    case "FaUsers":
      return <FaUsers className={className} />;
    case "FaShieldAlt":
      return <FaShieldAlt className={className} />;
    case "FaPencilRuler":
      return <FaPencilRuler className={className} />;
    case "FaBook":
      return <FaBook className={className} />;
    case "FaBalanceScale":
      return <FaBalanceScale className={className} />;
    case "FaCogs":
      return <FaCogs className={className} />;
    case "FaGlobe":
      return <FaGlobe className={className} />;
    case "GiUpgrade":
      return <GiUpgrade className={className} />;
    case "CgWebsite":
      return <CgWebsite className={className} />;
    case "DesignIcon":
      return <DesignIcon className={className} />;
    case "DevelopIcon":
      return <DevelopIcon className={className} />;
    case "LockIcon":
      return <LockIcon className={className} />;
    case "HostingIcon":
      return <HostingIcon className={className} />;
    case "LaunchIcon":
      return <LaunchIcon className={className} />;
    case "AllInclusiveIcon":
      return <AllInclusiveIcon className={className} />;
    case "IoLogoAngular":
      return <IoLogoAngular className={className} />;
    case "IoInfiniteSharp":
      return <IoInfiniteSharp className={className} />;
    case "IoMedalSharp":
      return <IoMedalSharp className={className} />;
    case "IoBusinessSharp":
      return <IoBusinessSharp className={className} />;
    default:
      return <></>;
  }
};

export default Icon;
