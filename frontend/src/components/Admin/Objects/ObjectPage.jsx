import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import ControlForm from "../Components/ControlForm/ControlForm";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../Elements/Base/BaseContent";
import CreateUpdateArticle from "../../Articles/Create/ArticleCreateUpdate";
import IndividualArticleView from "../../Articles/Read/IndividualArticleView";
import UpdateArticleView from "../../Articles/Update/UpdateArticleView";
import ArticleCreate from "./Edit/ArticleCreate";

function ObjectPage() {
  const location = useLocation();
  const { url, keys, appName, model, id, data } = location.state || {};
  console.log("id: ", id);
  console.log("modelName: ", model);

  const handleCreateFormOpen = () => {
    setCreateFormOpen(true);
  };

  const handleCreateFormClose = () => {
    setCreateFormOpen(false);
  };

  const fetchData = async () => {
    if (url && keys) {
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log("admin-panel", response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const handleUpdate = () => {
    fetchData();
  };

  return (
    <ContentLayout
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <BaseContent maxWidth={1200} pt={4} pb={4}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          {/* <Link style={{ color: "black" }} to="/admin">
            Admin
          </Link> */}
          <Link style={{ color: "black" }} to="/admin">
            Admin Dashboard
          </Link>
          <Link
            to={`/admin${url}`}
            state={{
              url: url,
              keys: keys,
              appName: appName,
              model: model,
              id: id,
            }}
            key={appName}
            style={{ color: "black" }}
          >
            {model.verbose_name}
          </Link>
          <Typography color="textPrimary">
            {Array.isArray(id) ? "Creation" : "Update"}
          </Typography>
        </Breadcrumbs>
        {!Array.isArray(id) && !data ? (
          <UpdateArticleView manualId={id} />
        ) : model.verbose_name === "Articles" ? (
          <ArticleCreate />
        ) : !data ? (
          <ControlForm
            endpointUrl={url}
            onClose={handleCreateFormClose}
            handleUpdate={handleUpdate}
          />
        ) : (
          <ControlForm
            endpointUrl={url}
            data={data}
            onClose={handleCreateFormClose}
            handleUpdate={handleUpdate}
          />
        )}
      </BaseContent>
    </ContentLayout>
  );
}

export default ObjectPage;
