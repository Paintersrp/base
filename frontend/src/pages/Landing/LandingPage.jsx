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
import IconScroller from "../../components/Animations/IconScroller/IconScroller";
import FeatureTiles from "../../components/Features/Content/FeatureTiles/FeatureTiles";
import LatestNews from "../../components/Features/News/LatestNews";
import PricingOverview from "../../components/Features/Pricing/StandardPricing/Pricing";
import BetterTestimonials from "../../components/Features/Testimonials/SpeechBubbleTestimonials/SpeechBubbles";
import NewsletterForm from "../../components/Forms/Newsletter/NewsletterForm";
import HeroCarousel from "../../components/Heroes/HeroCarousel/HeroCarousel";
import axiosInstance from "../../lib/Axios/axiosInstance";
import ContentLayout from "../../components/Layout/ContentLayout";

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
        <FeatureTiles />
        <BetterTestimonials />
        <LatestNews />
        <NewsletterForm />
      </div>
    </ContentLayout>
  );
}

export default LandingPage;
