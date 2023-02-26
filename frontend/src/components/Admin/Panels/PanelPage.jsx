import React from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import Panel from "./Panel";

function PanelPage() {
  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <Panel />
    </ContentLayout>
  );
}

export default PanelPage;
