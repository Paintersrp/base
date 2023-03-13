import { FaBoxOpen, FaHSquare } from "react-icons/fa";
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

const linkData = (jobPostings) => [
  {
    name: "Home",
    icon: <HomeIcon style={{ color: "#ff8c00" }} />,
    link: "/",
  },
  {
    name: "About",
    icon: <InfoIcon />,
    link: "/about",
  },
  {
    name: "Contact",
    icon: <ContactMailSharpIcon style={{ color: "#ff8c00" }} />,
    link: "/contact",
  },

  {
    name: "Services",
    icon: <StyleIcon />,
    children: [
      {
        name: "Services Overview",
        link: "/services",
        icon: <QuizIcon style={{ color: "#ff8c00" }} />,
      },
      {
        name: "Personal Tier",
        link: "/services/2/",
        icon: <DeskIcon />,
      },
      {
        name: "Premium Tier",
        link: "/services/3/",
        icon: <ApiSharpIcon style={{ color: "#ff8c00" }} />,
      },
      {
        name: "Professional Tier",
        link: "/services/4/",
        icon: <DiamondSharpIcon />,
      },
    ],
  },

  {
    name: "Articles",
    icon: <NewspaperSharpIcon style={{ color: "#ff8c00" }} />,
    link: "/articles",
  },
  {
    name: "Support",
    icon: <ContactSupportSharpIcon />,
    link: "/support",
  },
  {
    name: "Jobs",
    icon: <WorkSharpIcon style={{ color: "#ff8c00" }} />,
    children: jobPostings.map((job, index) => ({
      name: job.position,
      link: `/jobposting/${job.id}/`,
      icon: (
        <ChevronRightSharpIcon
          style={{ color: index % 2 === 0 ? "#ff8c00" : null }}
        />
      ),
    })),
  },
  {
    name: "Demos",
    icon: <FaBoxOpen size={22} />,
    children: [
      {
        name: "WIP Components",
        link: "/WIP",
        icon: <FaHSquare size={22} style={{ color: "#ff8c00" }} />,
      },
    ],
  },
];

export default linkData;
