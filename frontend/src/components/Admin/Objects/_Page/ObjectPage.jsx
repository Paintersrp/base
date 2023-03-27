import {
  Breadcrumbs,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Elements/Layout/PageContainer";
import AutoForm from "../AutoForm/AutoForm";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent";
import UpdateArticleView from "../../../Articles/Update/UpdateArticleView";
import ArticleCreate from "../Mixins/Articles/ArticleCreate";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import Loading from "../../../Elements/Layout/Loading/Loading";

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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  breadCrumbs: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
}));

function ObjectPage() {
  const { str, pk } = useParams();
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
  const [create, setCreate] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(str, "str");
  console.log(pk, "pk");

  const fetchData = async () => {
    if (url && keys) {
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log("OBJ PAGE: ", response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  useEffect(() => {
    setReady(false);
    if (!location.state && !pk) {
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
          setCreate(true);
          console.log("OBJ PAGE URL: ", response.data.url);
          console.log("OBJ PAGE KEYS: ", response.data.keys);
        })
        .catch((error) => console.log(error));
    } else if (!location.state && pk) {
      axiosInstance
        .get(`/get_models/${str}/`)
        .then((response) => {
          console.log(response.data);
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);

          setCreate(false);
          console.log("OBJ PAGE URL: ", response.data.url);
          console.log("OBJ PAGE KEYS: ", response.data.keys);
        })
        .catch((error) => console.log(error));
      axiosInstance
        .get(`/${str}/${pk}/`)
        .then((response) => {
          setData(response.data);
          setCreate(false);
          console.log("GOT DATA?: ", response.data);
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

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {metadata && (
        <BaseContent maxWidth={1200} pt={4} pb={4}>
          {!isSmallScreen && (
            <Typography variant="h3" className={classes.title}>
              {model.verbose_name}
            </Typography>
          )}
          <Breadcrumbs
            className={classes.breadCrumbs}
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            style={{ display: "flex" }}
            classes={{ separator: classes.breadCrumbs }}
          >
            <Tooltip
              title={`Dashboard`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Link className={classes.activeLink} to="/admin">
                Home
              </Link>
            </Tooltip>
            <Tooltip
              title={`${
                appName.charAt(0).toUpperCase() + appName.slice(1)
              } Overview`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Link
                className={classes.activeLink}
                to={`/admin/model/${appName}`}
              >
                {appName.charAt(0).toUpperCase() + appName.slice(1)}
              </Link>
            </Tooltip>
            <Tooltip
              title={`${model.verbose_name} Model`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
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
            </Tooltip>

            <Typography
              color="textPrimary"
              style={{ fontSize: isSmallScreen ? "0.8rem" : "0.95rem" }}
            >
              {Array.isArray(id) ? "Creation" : "Update"}
            </Typography>
          </Breadcrumbs>
          {!Array.isArray(id) && !data && model.verbose_name === "Articles" ? (
            <UpdateArticleView manualId={id} />
          ) : model.verbose_name === "Articles" ? (
            <ArticleCreate />
          ) : create ? (
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
