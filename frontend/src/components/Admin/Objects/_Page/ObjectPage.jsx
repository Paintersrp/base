import { Breadcrumbs, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "../../../Elements/Layout/PageContainer";
import AutoForm from "../AutoForm/AutoForm";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent";
import UpdateArticleView from "../../../Articles/Update/UpdateArticleView";
import ArticleCreate from "../Mixins/Articles/ArticleCreate";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  activeLink: {
    color: "#007bff",
  },
  title: {
    textAlign: "center",
    color: "black",
    borderRight: "1px solid #666666",
    marginRight: 16,
    paddingRight: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
}));

function ObjectPage() {
  const classes = useStyles();
  const location = useLocation();
  const { url, keys, appName, model, metadata, id, data } =
    location.state || {};

  const fetchData = async () => {
    if (url && keys) {
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response.data);
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
    <PageContainer
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      <BaseContent maxWidth={1200} pt={4} pb={4}>
        <Typography variant="h3" className={classes.title}>
          {model.verbose_name}
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          style={{ display: "flex" }}
        >
          <Link className={classes.activeLink} to="/admin">
            Home
          </Link>
          <Link
            to={`/admin${url}`}
            state={{
              url: url,
              keys: keys,
              appName: appName,
              model: model,
              metadata: metadata,
              id: id,
            }}
            key={appName}
            className={classes.activeLink}
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
          <AutoForm endpointUrl={url} handleUpdate={handleUpdate} />
        ) : (
          <AutoForm endpointUrl={url} data={data} handleUpdate={handleUpdate} />
        )}
      </BaseContent>
    </PageContainer>
  );
}

export default ObjectPage;
