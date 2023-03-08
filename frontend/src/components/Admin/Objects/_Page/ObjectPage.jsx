import { Breadcrumbs, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
  const { str } = useParams();
  const classes = useStyles();
  const location = useLocation();
  const [model, setModel] = useState(null);
  const [appName, setAppName] = useState(null);
  const [keys, setKeys] = useState(null);
  const [url, setUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [ready, setReady] = useState(false);

  // const { url, keys, appName, model, metadata, id, data } =
  //   location.state || {};
  // console.log("STATE: ", location.state);

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

  useEffect(() => {
    setReady(false);
    if (!location.state) {
      axiosInstance
        .get(`/get_models/${str}/`)
        .then((response) => {
          console.log(response.data);
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setReady(true);
        })
        .catch((error) => console.log(error));
    } else {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setId(location.state.id);
      setData(location.state.data);
      setReady(true);
    }
  }, []);

  const handleUpdate = () => {
    fetchData();
  };

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {metadata && (
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
          {!Array.isArray(id) && !data && model.verbose_name === "Articles" ? (
            <UpdateArticleView manualId={id} />
          ) : model.verbose_name === "Articles" ? (
            <ArticleCreate />
          ) : !data ? (
            <AutoForm endpointUrl={url} handleUpdate={handleUpdate} />
          ) : (
            <AutoForm
              endpointUrl={url}
              data={data}
              handleUpdate={handleUpdate}
            />
          )}
        </BaseContent>
      )}
    </PageContainer>
  );
}

export default ObjectPage;
