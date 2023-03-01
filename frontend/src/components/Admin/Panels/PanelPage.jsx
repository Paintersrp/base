import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import Panel from "./Panel";

function PanelPage() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState();

  useEffect(() => {
    if (!location.state) {
      axiosInstance
        .get(`/get_models/${id}/`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      {/* {data && <Panel apiData={data} />}
      {location.state && <Panel />} */}
      {data || location.state ? <Panel apiData={data} /> : null}
    </ContentLayout>
  );
}

export default PanelPage;
