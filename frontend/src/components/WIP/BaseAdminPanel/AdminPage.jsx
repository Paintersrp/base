import React from "react";
import { useLocation, useParams } from "react-router-dom";

import ContentLayout from "../../Elements/Layout/ContentLayout";
import BaseAdminPanel from "./BaseAdminPanel";

function AdminPage() {
  const { id } = useParams();
  const location = useLocation();
  console.log("state: ", location.state);
  const { url, keys } = location.state || {};
  console.log("url: ", url);
  console.log("keys: ", keys);
  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <BaseAdminPanel url={url} keys={keys} />
    </ContentLayout>
  );
}

export default AdminPage;
