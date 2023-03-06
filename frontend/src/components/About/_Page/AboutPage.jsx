import React from "react";
import FAQAccordion from "../FAQ/FAQAccordion";
import About from "../About/About";
import PageContainer from "../../Elements/Layout/PageContainer";

function AboutPage({ handleUpdate }) {
  return (
    <PageContainer
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <About />
      <FAQAccordion />
    </PageContainer>
  );
}

export default AboutPage;
