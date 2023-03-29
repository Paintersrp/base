import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../lib/Axios/axiosInstance";
import PageContainer from "../Elements/Layout/PageContainer";
import ErrorPage from "../Elements/Layout/Errors/ErrorPage";
import Loading from "../Elements/Layout/Loading/Loading";
import FABMenu from "../Elements/Buttons/FABAdminMenu";
import ComponentRouter from "./ComponentRouter";
import BaseContent from "../Elements/Base/BaseContent";

const DynamicPage = ({ handleUpdate }) => {
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const editmode = useSelector((state) => state.editmode);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    axiosInstance
      .get("/reactpage/1/")
      .then((response) => {
        setData(response.data);
        setReady(true);
        console.log(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (!ready || !data) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer backgroundColor="#F5F5F5" page_name="News">
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      <BaseContent
        maxWidth={1920}
        boxShadow={0}
        pad={0}
        justifyChildren="center"
        fd="column"
      >
        {data.components.map((component) => {
          console.log("component", component.data_source);
          const { component_name, data_source, order, ...componentProps } =
            component;
          console.log("data_source", data_source);

          return (
            <div key={component.id} style={{ order: order, maxWidth: "100%" }}>
              <ComponentRouter
                apiData={data_source || ""}
                type={component_name}
                setError={setError}
                editMode={editmode.editMode}
                {...componentProps}
              />
            </div>
          );
        })}
      </BaseContent>
    </PageContainer>
  );
};

export default DynamicPage;
