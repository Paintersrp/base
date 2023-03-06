import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import PageContainer from "../../../Elements/Layout/PageContainer";
import Panel from "../Panel";

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
    <PageContainer
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      {data || location.state ? <Panel apiData={data} /> : null}
    </PageContainer>
  );
}

export default PanelPage;
