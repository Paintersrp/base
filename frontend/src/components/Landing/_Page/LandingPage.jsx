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
import LatestNews from "../News/News";
import Testimonials from "../Testimonials/Testimonials";
import NewsletterForm from "../Newsletter/NewsletterForm";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import IconScroller from "../../Elements/Animations/IconScroller/IconScroller";
import Processes from "../Processes/Processes";
import Pricing from "../Pricing/Pricing";
import Hero from "../Hero/Hero";
import Loading from "../../Elements/Layout/Loading";

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
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/contactinformation/")
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
      {Object.keys(contactData).length > 0 ? (
        <>
          <Hero contactData={contactData} form={true} />
          <Pricing />
          <Processes />
          <LatestNews />
          {/* <Testimonials /> */}
          <NewsletterForm />
          <IconScroller data={partners} />
        </>
      ) : (
        <Loading loading={true} />
      )}
    </ContentLayout>
  );
}

export default LandingPage;
