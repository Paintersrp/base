import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import PageContainer from "../../../Elements/Layout/PageContainer";
import Panel from "../Panel";

function PanelPage() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState();
  const [apiData, setApiData] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/get_models/${id}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {apiData ? <Panel apiData={apiData} /> : null}
    </PageContainer>
  );
}

export default PanelPage;
