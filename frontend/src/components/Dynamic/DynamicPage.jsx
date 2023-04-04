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

const DynamicPage = ({ handleUpdate, page, filteredPageData }) => {
  const [error, setError] = useState();
  const [ready, setReady] = useState(false);
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const editmode = useSelector((state) => state.editmode);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(filteredPageData.components);

  useEffect(() => {
    setReady(false);
    // axiosInstance
    //   .get(`/get-page/${page}/`)
    //   .then((response) => {
    //     setData(response.data);
    //     setReady(true);
    //   })
    //   .catch((err) => {
    //     setError(err);
    //   });
    setReady(true);
  }, [page]);

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
        maxWidth={"100%"}
        boxShadow={0}
        pad={0}
        justifyChildren="center"
        fd="column"
      >
        {filteredPageData.components.map((component) => {
          const {
            name,
            data_source,
            order,
            content_type_info,
            ...componentProps
          } = component;

          console.log("content_type_info", content_type_info);

          return (
            <div key={component.id} style={{ order: order, maxWidth: "100%" }}>
              <ComponentRouter
                navigate={navigate}
                auth={auth}
                apiData={data_source || ""}
                component={content_type_info.model}
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
