import React, { useState, useEffect, createRef } from "react";
import { motion, useAnimation } from "framer-motion";
import FAQAccordion from "../../components/About/FAQ/FAQAccordion";
import Content from "../../components/About/Content/Content";
import ContentLayout from "../../components/Elements/Layout/ContentLayout";

function AboutPage() {
  const contentRef = createRef();
  const faqRef = createRef();
  const [contentVisible, setContentVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const contentControls = useAnimation();
  const faqControls = useAnimation();

  const handleContentVisibility = () => {
    const contentBounds = contentRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (contentBounds.top <= windowHeight) {
      setContentVisible(true);
      contentControls.start("visible");
    }
  };

  const handleFaqVisibility = () => {
    const faqBounds = faqRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (faqBounds.top <= windowHeight) {
      setFaqVisible(true);
      faqControls.start("visible");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleContentVisibility);
    window.addEventListener("scroll", handleFaqVisibility);

    return () => {
      window.removeEventListener("scroll", handleContentVisibility);
      window.removeEventListener("scroll", handleFaqVisibility);
    };
  }, []);

  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <Content />
      {/* Jobs */}
      <FAQAccordion />
    </ContentLayout>
  );
}

export default AboutPage;
