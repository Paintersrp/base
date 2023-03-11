import {
  FaAddressCard,
  FaBell,
  FaBoxOpen,
  FaInfoCircle,
  FaHome,
  FaHSquare,
  FaRegNewspaper,
  FaSquareRootAlt,
} from "react-icons/fa";
import { MdContactSupport } from "react-icons/Md";

const linkData = [
  {
    name: "Home",
    icon: <FaHome size={22} />,
    link: "/",
  },
  {
    name: "About",
    icon: <FaInfoCircle size={22} />,
    link: "/about",
  },
  {
    name: "Services",
    icon: <FaBell size={22} />,
    link: "/services",
  },
  {
    name: "Contact",
    icon: <FaAddressCard size={22} />,
    link: "/contact",
  },
  {
    name: "Articles",
    icon: <FaRegNewspaper size={22} />,
    link: "/articles",
  },
  {
    name: "Support",
    icon: <MdContactSupport size={22} />,
    link: "/support",
  },
  {
    name: "Demos",
    icon: <FaBoxOpen size={22} />,
    children: [
      {
        name: "WIP Components",
        link: "/WIP",
        icon: <FaHSquare size={22} />,
      },
      // {
      //   name: "WIP2 Components",
      //   link: "/WIP2",
      //   icon: <FaSquareRootAlt size={22} />,
      // },
    ],
  },
];

export default linkData;
