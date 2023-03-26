import {
  Breadcrumbs,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Elements/Layout/PageContainer";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ReadApplication from "../../Panel/ReadApplication";
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
}));

function ApplicationViewPage({}) {
  const { pk } = useParams();
  const classes = useStyles();
  const location = useLocation();
  const [model, setModel] = useState(null);
  const [appName, setAppName] = useState(null);
  const [keys, setKeys] = useState(null);
  const [url, setUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [job, setJob] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (location.state) {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setId(location.state.id);
      setData(location.state.data);

      axiosInstance
        .get(`${location.state.url}${location.state.id}/`)
        .then((response) => {
          setData(response.data.application);
          setJob(response.data.job);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pk) {
      axiosInstance
        .get(`/get_models/application/`)
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
      axiosInstance
        .get(`application/${pk}/`)
        .then((response) => {
          setData(response.data.application);
          setJob(response.data.job);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {metadata && data && job && (
        <BaseContent maxWidth={1200} pt={4} pb={8}>
          <div style={{ paddingBottom: 16, display: "flex" }}>
            <Typography variant="h3" className={classes.title}>
              {model.verbose_name}
            </Typography>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              style={{ display: "flex" }}
            >
              <Tooltip
                title={`View Dashboard`}
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Link className={classes.activeLink} to="/admin">
                  Home
                </Link>
              </Tooltip>
              <Tooltip
                title={`View ${model.verbose_name} Model`}
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
              <Typography color="textPrimary">Read</Typography>
            </Breadcrumbs>
          </div>
          <ReadApplication application={data} job={job} metadata={metadata} />
        </BaseContent>
      )}
    </PageContainer>
  );
}

export default ApplicationViewPage;
