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
import NewsletterForm from "../Newsletter/NewsletterForm";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import PageContainer from "../../Elements/Layout/PageContainer";
import IconScroller from "../../Elements/Animations/IconScroller/IconScroller";
import Processes from "../Processes/Processes";
import Pricing from "../Pricing/Pricing";
import Hero from "../Hero/Hero";
import Loading from "../../Elements/Layout/Loading";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";

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

function LandingPage({ handleUpdate }) {
  const [contactData, setContactData] = useState([]);
  const [editing, setEditing] = useState(false);

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
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Landing"
    >
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
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
    </PageContainer>
  );
}

export default LandingPage;
