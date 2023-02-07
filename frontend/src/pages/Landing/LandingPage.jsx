import React from "react";
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
import "./MainSection.css";

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

const items = [
  {
    index: 0,
    image: "images/masonry/img1.jpg",
    buttonText: "View Project",
    buttonLink: "/item-1",
  },
  {
    index: 1,
    image: "images/masonry/img2.jpg",
    buttonText: "View Project",
    buttonLink: "/item-2",
  },
  {
    index: 2,
    image: "images/masonry/img3.jpg",
    buttonText: "View Project",
    buttonLink: "/item-3",
  },
  {
    index: 3,
    image: "images/masonry/img4.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-4",
  },
  {
    index: 4,
    image: "images/masonry/img5.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-5",
  },
  {
    index: 5,
    image: "images/masonry/img6.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-6",
  },
];

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="">
        <HeroCarousel items={items} />
      </div>
      <div>
        <IconScroller data={partners} />
      </div>
      <div className="">
        <PricingOverview />
      </div>
      <div className="">
        <FeatureTiles />
      </div>
      <div className="car-container">
        <BetterTestimonials />
      </div>
      <div className="">
        <LatestNews />
      </div>
      <div className="">
        <NewsletterForm />
      </div>
    </div>
  );
}

export default LandingPage;
