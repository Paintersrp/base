import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaStackOverflow,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import Demo from "./Demo";
import EventSchedule from "../../components/Features/Content/EventSchedule-WIP/EventSchedule";
import MinimalTestimonials from "../../components/Features/Testimonials/_MinimalTestimonials/MinimalTestimonials";
import PricingTier from "../../components/Features/Pricing/_MinimalPricing/MinimalPricing";
import CategoryTiles from "../../components/Features/Commerce/Categories/Categories";
import CompanyInfo from "../../components/Features/Business/CompanyInfo/CompanyInfo";
import FeatureCTA from "../../components/Features/Content/FeatureCTA/FeatureCTA";
import FeaturedProducts from "../../components/Features/Commerce/FeaturedProducts/FeaturedProduct";
import FeatureTiles from "../../components/Features/Content/FeatureTiles/FeatureTiles";
import OurProcess from "../../components/Features/Business/OurProcess/OurProcess";
import Partners from "../../components/Features/Business/Partners/Partners";
import Reviews from "../../components/Features/Reviews/Reviews";
import LatestNews from "../../components/Features/News/LatestNews";
import WhatWeDo from "../../components/Features/Business/WhatWeDo/WhatWeDo";
import BetterFeatures from "../../components/Features/Content/BetterFeatures/BetterFeatures";

const partners = [
  {
    id: 1,
    icon: FaTwitter,
  },
  {
    id: 2,
    icon: FaFacebook,
  },
  {
    id: 3,
    icon: FaInstagram,
  },
  {
    id: 4,
    icon: FaLinkedin,
  },
  {
    id: 5,
    icon: FaYoutube,
  },
  {
    id: 6,
    icon: FaGithub,
  },
  {
    id: 7,
    icon: FaStackOverflow,
  },
];

const products = [
  {
    id: 1,
    name: "Camera",
    image: "images/products/product1.webp",
    rating: 4,
    price: "10.99",
    description: "Takes Pictures",
  },
  {
    id: 2,
    name: "Titty Camera",
    image: "images/products/product2.jpeg",
    rating: 3,
    price: "20.99",
    description: "It's a fucking camera",
  },
  {
    id: 3,
    name: "Drugs",
    image: "images/products/product3.jpeg",
    rating: 5,
    price: "30.99",
    description: "Take em",
  },
  // and so on
];

const data = [
  {
    title: "Design",
    description:
      "Our experienced designers create visually stunning websites that accurately reflect your brand and appeal.",
    icon: DesignIcon,
  },
  {
    title: "Develop",
    description:
      "Our developers use the latest technologies and best practices to turn your design into a fully functional website.",
    icon: DevelopIcon,
  },
  {
    title: "Secure",
    description:
      "We implement industry-standard security measures to protect your website and users' data.",
    icon: LockIcon,
  },
  {
    title: "Host",
    description:
      "We offer a variety of hosting options optimized for speed and reliability, and provide ongoing support.",
    icon: HostingIcon,
  },
  {
    title: "Launch",
    description:
      "We ensure a smooth launch of your website, including SEO optimization and social media promotion.",
    icon: LaunchIcon,
  },
  {
    title: "Maintain",
    description:
      "We provide ongoing maintenance services to keep your website updated and running smoothly.",
    icon: AllInclusiveIcon,
  },
];

const whatWeDoData = [
  {
    icon: FaCode,
    title: "Development",
    description:
      "We specialize in creating custom software solutions for businesses of all sizes.",
    onClick: () => console.log("Development clicked"),
  },
  {
    icon: FaPencilRuler,
    title: "Design",
    description:
      "We design visually stunning interfaces and user experiences that are easy to use.",
    onClick: () => console.log("Design clicked"),
  },
  {
    icon: FaServer,
    title: "Infrastructure",
    description:
      "We ensure your software is running smoothly and securely on the cloud or on-premises.",
    onClick: () => console.log("Infrastructure clicked"),
  },
];

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

const eventSets2 = [
  {
    day: "Monday",
    events: [
      {
        date: "January 1, 2022",
        time: "9:00 AM",
        description:
          "I have been extremely satisfied with the services provided by this company. They exceeded my expectations.",
        presenter: "John Doe",
        company: "Acme Inc.",
        location: "Conference Room A",
        link: "https://www.example.com/event1",
      },
      {
        date: "January 1, 2022",
        time: "10:00 AM",
        description: "Event 2",
        presenter: "Jane Smith",
        company: "ABC Corp.",
        location: "Conference Room B",
        link: "https://www.example.com/event2",
      },
      {
        date: "January 1, 2022",
        time: "9:00 AM",
        description: "Event 3",
        presenter: "John Doe",
        company: "Acme Inc.",
        location: "Conference Room A",
        link: "https://www.example.com/event1",
      },
      {
        date: "January 1, 2022",
        time: "10:00 AM",
        description: "Event 4",
        presenter: "Jane Smith",
        company: "ABC Corp.",
        location: "Conference Room B",
        link: "https://www.example.com/event2",
      },
      {
        date: "January 1, 2022",
        time: "9:00 AM",
        description: "Event 5",
        presenter: "John Doe",
        company: "Acme Inc.",
        location: "Conference Room A",
        link: "https://www.example.com/event1",
      },
      {
        date: "January 1, 2022",
        time: "10:00 AM",
        description: "Event 6",
        presenter: "Jane Smith",
        company: "ABC Corp.",
        location: "Conference Room B",
        link: "https://www.example.com/event2",
      },
    ],
  },
  {
    day: "Tuesday",
    events: [
      {
        date: "January 2, 2022",
        time: "9:00 AM",
        description: "Event 3",
        presenter: "Bob Johnson",
        company: "XYZ Inc.",
        location: "Conference Room C",
        link: "https://www.example.com/event3",
      },
      {
        date: "January 2, 2022",
        time: "10:00 AM",
        description: "Event 4",
        presenter: "Mary Brown",
        company: "MyCompany LLC.",
        location: "Conference Room D",
        link: "https://www.example.com/event4",
      },
    ],
  },
  {
    day: "Wednesday",
    events: [
      {
        date: "January 2, 2022",
        time: "9:00 AM",
        description: "Event 3",
        presenter: "Bob Johnson",
        company: "XYZ Inc.",
        location: "Conference Room C",
        link: "https://www.example.com/event3",
      },
      {
        date: "January 2, 2022",
        time: "10:00 AM",
        description: "Event 4",
        presenter: "Mary Brown",
        company: "MyCompany LLC.",
        location: "Conference Room D",
        link: "https://www.example.com/event4",
      },
    ],
  },
  {
    day: "Thursday",
    events: [
      {
        date: "January 2, 2022",
        time: "9:00 AM",
        description: "Event 3",
        presenter: "Bob Johnson",
        company: "XYZ Inc.",
        location: "Conference Room C",
        link: "https://www.example.com/event3",
      },
      {
        date: "January 2, 2022",
        time: "10:00 AM",
        description: "Event 4",
        presenter: "Mary Brown",
        company: "MyCompany LLC.",
        location: "Conference Room D",
        link: "https://www.example.com/event4",
      },
    ],
  },
];

const faqData = {
  Shipping: [
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping. Please note that shipping rates and delivery times may vary depending on the destination and shipping method chosen.",
      id: "1",
    },
    {
      question: "How long does it take for my order to ship?",
      answer:
        "Orders typically ship within 1-2 business days. Shipping times may vary depending on your location.",
      id: "2",
    },
  ],
  Returns: [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in their original condition.",
      id: "3",
    },
    {
      question: "How do I initiate a return?",
      answer: "To initiate a return, please contact us at returns@example.com",
      id: "4",
    },
  ],
  Payment: [
    {
      question: "What forms of payment do you accept?",
      answer: "We accept Visa, Mastercard, American Express, and PayPal.",
      id: "5",
    },
    {
      question: "Is it safe to use my credit card on your website?",
      answer:
        "Yes, our website is secured with SSL encryption to ensure the safety of your personal information.",
      id: "6",
    },
  ],
};

const eventSets = {
  Monday: [
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description:
        "I have been extremely satisfied with the services provided by this company. They exceeded my expectations.",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 2",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description: "Event 5",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 6",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
  ],
  Tuesday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
  Wednesday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
  Thursday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
};

const featureComponents = [
  {
    component: EventSchedule,
    title: "EventSchedule",
    props: {
      eventSets,
    },
  },
  {
    component: MinimalTestimonials,
    title: "MinimalTestimonials",
    props: {
      testimonials,
    },
  },
  {
    component: PricingTier,
    title: "PricingTier",
  },
  {
    component: CategoryTiles,
    title: "CategoryTiles",
  },
  {
    component: CompanyInfo,
    title: "CompanyInfo",
  },
  {
    component: FeatureCTA,
    title: "FeatureCTA",
  },
  {
    component: FeaturedProducts,
    title: "FeaturedProducts",
    props: { products },
  },
  {
    component: FeatureTiles,
    title: "FeatureTiles",
  },
  {
    component: OurProcess,
    title: "OurProcess",
    props: {
      data: data,
      title: "Creating and Hosting Websites",
      subtitle: "Our Process",
    },
  },
  {
    component: Partners,
    title: "Partners",
  },
  {
    component: Reviews,
    title: "Reviews",
  },
  {
    component: LatestNews,
    title: "LatestNews",
  },
  {
    component: WhatWeDo,
    title: "WhatWeDo WIP",
    props: { data: whatWeDoData },
  },
  {
    component: BetterFeatures,
    title: "BetterFeatures WIP",
  },
];

export default function FeatureDemo() {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Demo demoTitle="Feature Components" components={featureComponents} />
    </div>
  );
}
