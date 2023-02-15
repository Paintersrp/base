import React from "react";
import FAQAccordion from "../FAQ/FAQAccordion";
import About from "../About/About";
import ContentLayout from "../../Elements/Layout/ContentLayout";

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
      <About />
      {/* Jobs */}
      <FAQAccordion />
    </ContentLayout>
  );
}

export default AboutPage;
