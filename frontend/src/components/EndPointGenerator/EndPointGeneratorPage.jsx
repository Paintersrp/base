import React from "react";
import PageContainer from "../Elements/Layout/PageContainer";
import EndPointGenerator from "./EndPointGenerator";

function GeneratorPage() {
  return (
    <PageContainer
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <EndPointGenerator />
    </PageContainer>
  );
}

export default GeneratorPage;
