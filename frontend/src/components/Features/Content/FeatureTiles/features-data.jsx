import React from "react";
import {
  FaLaptopCode,
  FaCloud,
  FaMobileAlt,
  FaRocket,
  FaLock,
  FaCog,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    title: "Web Development",
    subheader: "Build custom websites and web applications",
    icon: <FaLaptopCode />,
  },
  {
    title: "Cloud Computing",
    subheader: "Host and manage your applications in the cloud",
    icon: <FaCloud />,
  },
  {
    title: "Mobile Development",
    subheader: "Create native mobile apps for iOS and Android",
    icon: <FaMobileAlt />,
  },
  {
    title: "Rapid Deployment",
    subheader: "Get your products to market faster with our agile approach",
    icon: <FaRocket />,
  },
  {
    title: "Security",
    subheader: "Ensure the security and privacy of your data",
    icon: <FaLock />,
  },
  {
    title: "Customization",
    subheader: "Configure to your personal liking",
    icon: <FaCog />,
  },
];

export default features;
