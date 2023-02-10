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

const Icon = ({ icon }) => {
  switch (icon) {
    case "FaUser":
      return <FaUser />;
    case "FaUsers":
      return <FaUsers />;
    case "FaShieldAlt":
      return <FaShieldAlt />;
    case "FaPencilRuler":
      return <FaPencilRuler />;
    case "FaBook":
      return <FaBook />;
    case "FaBalanceScale":
      return <FaBalanceScale />;
    case "FaCogs":
      return <FaCogs />;
    case "FaGlobe":
      return <FaGlobe />;
    default:
      return <></>;
  }
};

export default Icon;
