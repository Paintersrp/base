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
import LatestNews from "../../components/Landing/News/News";
import Testimonials from "../../components/Landing/Testimonials/Testimonials";
import NewsletterForm from "../../components/Landing/Newsletter/NewsletterForm";
import Hero from "../../components/Landing/Hero/Hero";
import axiosInstance from "../../lib/Axios/axiosInstance";
import ContentLayout from "../../components/Elements/Layout/ContentLayout";
import IconScroller from "../../components/Elements/Animations/IconScroller/IconScroller";
import Processes from "../../components/Landing/Processes/Processes";
import Pricing from "../../components/Landing/Pricing/Pricing";
import BasePaper from "../../components/Elements/Base/BasePaper";

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
  const [contactData, setContactData] = useState([]);

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
      axiosInstance
        .get("/contact/")
        .then((response) => {
          console.log(response.data);
          setContactData(response.data);
        })
        .catch((err) => {
          setError(err);
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
      backgroundColor="white"
    >
      <div style={{ minHeight: 700, width: "100vw" }}>
        <Hero items={items} setItems={setItems} contactData={contactData} />
        <Pricing />
        <Processes />
        <LatestNews />
        <Testimonials />
        <NewsletterForm />
        <IconScroller data={partners} />
      </div>
    </ContentLayout>
  );
}

export default LandingPage;
