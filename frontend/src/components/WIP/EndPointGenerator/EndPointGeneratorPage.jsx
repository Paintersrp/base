import React from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import EndPointGenerator from "./EndPointGenerator";

function GeneratorPage() {
  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <EndPointGenerator />
    </ContentLayout>
  );
}

export default GeneratorPage;
