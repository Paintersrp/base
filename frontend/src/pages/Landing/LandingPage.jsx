import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import IconScroller from "../../components/Animations/IconScroller/IconScroller";
import FeatureTiles from "../../components/Features/Content/FeatureTiles/FeatureTiles";
import LatestNews from "../../components/Features/News/LatestNews";
import PricingOverview from "../../components/Features/Pricing/StandardPricing/Pricing";
import BetterTestimonials from "../../components/Features/Testimonials/SpeechBubbleTestimonials/SpeechBubbles";
import NewsletterForm from "../../components/Forms/Newsletter/NewsletterForm";
import HeroCarousel from "../../components/Heroes/HeroCarousel/HeroCarousel";
import axiosInstance from "../../lib/Axios/axiosInstance";
import ContentLayout from "../../components/Layout/ContentLayout";
import OurProcess from "../../components/Features/Business/OurProcess/OurProcess";

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

const data = [
  {
    title: "Design",
    description:
      "Our experienced designers create visually stunning websites that accurately reflect your brand and appeal.",
    icon: "DesignIcon",
  },
  {
    title: "Develop",
    description:
      "Our developers use the latest technologies and best practices to turn your design into a fully functional website.",
    icon: "DevelopIcon",
  },
  {
    title: "Secure",
    description:
      "We implement industry-standard security measures to protect your website and users' data.",
    icon: "LockIcon",
  },
  {
    title: "Host",
    description:
      "We offer a variety of hosting options optimized for speed and reliability, and provide ongoing support.",
    icon: "HostingIcon",
  },
  {
    title: "Launch",
    description:
      "We ensure a smooth launch of your website, including SEO optimization and social media promotion.",
    icon: "LaunchIcon",
  },
  {
    title: "Maintain",
    description:
      "We provide ongoing maintenance services to keep your website updated and running smoothly.",
    icon: "AllInclusiveIcon",
  },
];

function LandingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/items/")
        .then((response) => {
          setItems(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
    >
      <div style={{ minHeight: 700, width: "100vw" }}>
        <HeroCarousel items={items} setItems={setItems} />
        <IconScroller data={partners} />
        <PricingOverview />
        <OurProcess
          data={data}
          title="Creating and Hosting Websites"
          subtitle="Our Process"
        />

        <LatestNews />
        <BetterTestimonials />
        <NewsletterForm />
      </div>
    </ContentLayout>
  );
}

export default LandingPage;
