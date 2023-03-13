import {
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaPencilRuler,
  FaBook,
  FaBalanceScale,
  FaCogs,
  FaGlobe,
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

const Icon = ({ icon, className }) => {
  switch (icon) {
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
