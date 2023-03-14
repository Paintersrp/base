import React, { useState } from "react";
import FAQAccordion from "../FAQ/FAQAccordion";
import About from "../About/About";
import PageContainer from "../../Elements/Layout/PageContainer";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";
import { useSelector } from "react-redux";

function AboutPage({ handleUpdate }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);


  if (error) {
    return (
      <ErrorPage
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="About"
    >
      
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      <About setError={setError} />
      <FAQAccordion setError={setError} />
    </PageContainer>
  );
}

export default AboutPage;
