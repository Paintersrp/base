import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import Demo from "./Demo";
import ContactButtons from "../../components/Elements/Buttons/ContactButtons";
import SocialSection from "../../components/Elements/Buttons/SocialButtons";
import FloatingFeature from "../../components/Features/Content/FloatingFeature";
import CoreValues from "../../components/Features/Business/CompanyInfo/CoreValues";
import AdvancedSnackbar from "../../components/Elements/Snackbars/Snackbar";
import ContentBlock from "../../components/Elements/TextBlocks/ContentBlock";
import TitleBlock from "../../components/Elements/TextBlocks/TitleBlock";
import AccordionQA from "../../components/Features/Accordions/AccordionQA";
import TestimonialCard from "../../components/Features/Testimonials/TestimonialCard";
import ComplexFooter from "../../navigation/Components/Footer/_ComplexFooter/ComplexFooter";
import ImageGallery from "../../components/Images/Gallery/ImageGallery";
import { useState } from "react";
import HeroBlock from "../../components/Elements/TextBlocks/HeroBlock/HeroBlock";

// {
//     component: TeamCard,
//     title: "TeamCard",
//     props: {
//       image: "images/members/member1.webp",
//       name: "John Doe",
//       position: "CEO",
//       socials: [
//         {
//           platform: "LinkedIn",
//           link: "https://www.linkedin.com/in/johndoe",
//         },
//         {
//           platform: "Twitter",
//           link: "https://twitter.com/johndoe",
//         },
//       ],
//       skills: [
//         {
//           skill: "Node.js",
//         },
//         {
//           skill: "React",
//         },
//         {
//           skill: "JavaScript",
//         },
//       ],
//     },
//   },

const testimonials = [
  {
    name: "John Doe",
    company: "Acme Inc.",
    review:
      "I have been extremely satisfied with the services provided by this company. They exceeded my expectations.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    review:
      "The team at this company was professional and efficient. I would recommend them to anyone.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Bob Johnson",
    company: "ABC LLC.",
    review:
      "I was impressed with the level of expertise and attention to detail demonstrated by the team.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const images2 = [
  {
    id: 1,
    url: "images/masonry/img1.jpg",
    title: "Image 1",
    description: "Titters cuck cuck cuck cuck cuck cuck cuck cuck Titters",
  },
  {
    id: 2,
    url: "images/masonry/img2.jpg",
    title: "Image 2",
    description: "Titters",
  },
  {
    id: 3,
    url: "images/masonry/img3.jpg",
    title: "Image 3",
    description: "Titters",
  },
  {
    id: 4,
    url: "images/masonry/img4.jpeg",
    title: "Image 4",
    description: "Titters",
  },
  {
    id: 5,
    url: "images/masonry/img5.jpeg",
    title: "Image 5",
    description: "Titters",
  },
  {
    id: 6,
    url: "images/masonry/img6.jpeg",
    title: "Image 6",
    description: "Titters",
  },
];

const formComponents = [
  {
    component: ImageGallery,
    title: "ImageGallery",
    props: { images: images2 },
  },
  {
    component: ComplexFooter,
    title: "ComplexFooter",
  },
  {
    component: TestimonialCard,
    title: "TestimonialCard",
    props: {
      name: "Jane Doe",
      testimonial:
        "I was extremely impressed with the level of service and expertise provided by this company. They exceeded my expectations and I would highly recommend them to anyone.",
      company: "ABC Inc.",
      position: "CEO",
      image: "https://randomuser.com/api/portraits/women/1.jpg",
      color: "gold",
      textcolor: "#1C1C1C",
    },
  },
  {
    component: AccordionQA,
    title: "AccordionQA",
    props: {
      faq: {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we offer international shipping. Please note that shipping rates and delivery times may vary depending on the destination and shipping method chosen.",
        id: "1",
      },
    },
  },
  {
    component: HeroBlock,
    title: "HeroBlock",
    props: {
      title: "Custom Designs",
      heading: "Modern Framework, <br /> Design, and Hosting",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium elit sed consectetur ultricies. Praesent lacinia luctus lacus, sit amet cursus nisl faucibus ac. Proin sollicitudin, tellus et scelerisque hendrerit, leo turpis ornare diam, ac fermentum massa diam a nisi.",
      btnText: "Get Started",
      btnLink: "/about",
    },
  },
  {
    component: TitleBlock,
    title: "TitleBlock",
    props: {
      subtitle: "Categories",
      title: "Explore Our Products",
      description: "Suck Titties",
      alignment: "Center",
      showDivider: false,
    },
  },
  {
    component: ContentBlock,
    title: "ContentBlock",
    props: {
      title: "Explore Our Products",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium elit sed consectetur ultricies. Praesent lacinia luctus lacus, sit amet cursus nisl faucibus ac. Proin sollicitudin, tellus et scelerisque hendrerit, leo turpis ornare diam, ac fermentum massa diam a nisi.",
    },
  },
  {
    component: ContactButtons,
    title: "ContactButtons",
  },
  {
    component: SocialSection,
    title: "SocialSection",
  },
  {
    component: CoreValues,
    title: "CoreValues",
  },
  {
    component: FloatingFeature,
    title: "FloatingFeature",
    props: {
      step: {
        title: "Design",
        description:
          "Our experienced designers create visually stunning websites that accurately reflect your brand and appeal.",
        icon: DesignIcon,
      },
    },
  },
  {
    component: AdvancedSnackbar,
    title: "AdvancedSnackbar",
    props: {
      open: true,
      message: "This is a success message",
      type: "success",
      position: "bottom-left",
    },
  },
  {
    component: AdvancedSnackbar,
    title: "AdvancedSnackbar",
    props: {
      open: true,
      message: "This is an error message",
      type: "error",
      position: "bottom-right",
    },
  },

  {
    component: AdvancedSnackbar,
    title: "AdvancedSnackbar",
    props: {
      open: true,
      message: "This is an info message",
      type: "info",
      position: "bottom-center",
    },
  },
];

export default function PartsDemo() {
  return (
    <div>
      <Demo demoTitle="Parts Components" components={formComponents} />
    </div>
  );
}
