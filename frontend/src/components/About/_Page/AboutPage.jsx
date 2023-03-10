import React, { useState } from "react";
import FAQAccordion from "../FAQ/FAQAccordion";
import About from "../About/About";
import PageContainer from "../../Elements/Layout/PageContainer";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";

function AboutPage() {
  const [editing, setEditing] = useState(false);
  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="About"
    >
      <FABMenu editing={editing} setEditing={setEditing} />
      <About />
      <FAQAccordion />
    </PageContainer>
  );
}

export default AboutPage;
