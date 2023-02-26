import React from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import Dashboard from "./Dashboard";

function DashboardPage() {
  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <Dashboard />
    </ContentLayout>
  );
}

export default DashboardPage;
