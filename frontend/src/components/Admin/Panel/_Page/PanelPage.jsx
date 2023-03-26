import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import PageContainer from "../../../Elements/Layout/PageContainer";
import Panel from "../Panel";

function PanelPage({ setCount }) {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState({});
  const [ready, setReady] = useState(false);
  const [type, setType] = useState(null);
  const [recentActions, setRecentActions] = useState([]);
  console.log(id);

  useEffect(() => {
    if (id === "messages" || id === "application") {
      setData({});
      setReady(false);
    }

    if (location.state) {
      setType(location.state.type);
    } else {
      setType(null);
    }
  }, [id, location.state]);

  useEffect(() => {
    axiosInstance
      .get(`/get_models/${id}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
    axiosInstance
      .get(`/recent_admin_actions/?model=${id}`)
      .then((response) => {
        setRecentActions(response.data);
        setReady(true);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {ready ? (
        <Panel
          apiData={data}
          setCount={setCount}
          recentActions={recentActions}
          setRecentActions={setRecentActions}
          type={type}
        />
      ) : null}
    </PageContainer>
  );
}

export default PanelPage;
