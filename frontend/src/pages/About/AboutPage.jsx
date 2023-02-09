import React from "react";
import FAQAccordion from "../../components/About/FAQ/FAQAccordion";
import AboutLayout from "../../components/About/Layout/AboutLayout";
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
      <AboutLayout />
      {/* Jobs */}
      <FAQAccordion />
    </ContentLayout>
  );
}

export default AboutPage;
