import { Breadcrumbs, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Elements/Layout/PageContainer";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ReadMessage from "../../Panel/ReadMessage";

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

function ReadPage({ setCount }) {
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
    setUrl(location.state.url);
    setAppName(location.state.appName);
    setKeys(location.state.keys);
    setMetadata(location.state.metadata);
    setModel(location.state.model);
    setId(location.state.id);
    setData(location.state.data);
    console.log(location.state.url);

    axiosInstance
      .get(`${location.state.url}${location.state.id}/`)
      .then((response) => {
        setData(response.data.messages);
        setCount(response.data.count);
        console.log("RED:", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {metadata && (
        <BaseContent maxWidth={1200} pt={4} pb={4}>
          <div style={{ paddingBottom: 16, display: "flex" }}>
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
              <Typography color="textPrimary">Read</Typography>
            </Breadcrumbs>
          </div>
          <ReadMessage
            message={data}
            url={url}
            keys={keys}
            appName={appName}
            model={model}
            metadata={metadata}
            id={id}
          />
        </BaseContent>
      )}
    </PageContainer>
  );
}

export default ReadPage;
