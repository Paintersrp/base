import {
  FaAddressCard,
  FaBell,
  FaBoxOpen,
  FaInfoCircle,
  FaHome,
  FaHSquare,
  FaHandLizard,
  FaCogs,
  FaRegNewspaper,
} from "react-icons/fa";
import { GiPlatform } from "react-icons/gi";
import { MdContactSupport } from "react-icons/Md";

const linkData = [
  {
    name: "Home",
    icon: <FaHome size={22} />,
    link: "/",
  },
  {
    name: "Articles",
    icon: <FaRegNewspaper size={22} />,
    link: "/articles",
  },
  {
    name: "About",
    icon: <FaInfoCircle size={22} />,
    link: "/about",
  },
  {
    name: "Services",
    icon: <FaBell size={22} />,
    link: "/about",
  },
  {
    name: "Contact",
    icon: <FaAddressCard size={22} />,
    link: "/about",
  },
  {
    name: "Support",
    icon: <MdContactSupport size={22} />,
    link: "/ticket",
  },
  {
    name: "Demos",
    icon: <FaBoxOpen size={22} />,
    children: [
      {
        name: "Hero Components",
        link: "/heroes",
        icon: <FaHSquare size={22} />,
      },
      {
        name: "Feature Components",
        link: "/features",
        icon: (
          <FaHandLizard style={{ transform: "rotate(180deg)" }} size={22} />
        ),
      },
      {
        name: "Form Components",
        link: "/forms",
        icon: <GiPlatform size={22} />,
      },
      {
        name: "Parts Components",
        link: "/parts",
        icon: <FaCogs size={22} />,
      },
    ],
  },
];

export default linkData;
