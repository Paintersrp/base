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

const Icon = ({ icon, className }) => {
  switch (icon) {
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
    default:
      return <></>;
  }
};

export default Icon;
