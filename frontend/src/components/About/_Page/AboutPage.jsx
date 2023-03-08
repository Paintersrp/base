import React from "react";
import FAQAccordion from "../FAQ/FAQAccordion";
import About from "../About/About";
import PageContainer from "../../Elements/Layout/PageContainer";

function AboutPage() {
  return (
    <PageContainer backgroundColor="#F5F5F5" page_name="About">
      <About />
      <FAQAccordion />
    </PageContainer>
  );
}

export default AboutPage;
