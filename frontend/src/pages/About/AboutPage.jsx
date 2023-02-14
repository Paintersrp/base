import React, { useState, useEffect, createRef } from "react";
import { motion, useAnimation } from "framer-motion";
import FAQAccordion from "../../components/About/FAQ/FAQAccordion";
import Content from "../../components/About/Content/Content";
import ContentLayout from "../../components/Elements/Layout/ContentLayout";

function AboutPage() {
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
