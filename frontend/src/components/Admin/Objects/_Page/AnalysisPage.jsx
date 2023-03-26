import {
  Breadcrumbs,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Elements/Layout/PageContainer";
import { NavigateNext } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import SurveyAnalysis from "../../Panel/SurveyAnalysis";
import QuestionnaireAnalysis from "../../Panel/Analysis";

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
  breadCrumbs: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
}));

function AnalysisPage({}) {
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
  const [ready, setReady] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (pk) {
    console.log("PK", pk);
  } else {
    console.log("NO PK");
  }

  useEffect(() => {
    if (location.state.appName) {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setId(location.state.id);
      console.log("bigtest: ", location.state.data);

      axiosInstance
        .get(`questionnaires/${location.state.id}/results/`)
        .then((response) => {
          setData(response.data);

          console.log("RED:", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pk) {
      console.log(pk, "tits");
      axiosInstance
        .get(`/get_models/questionnaire/`)
        .then((response) => {
          console.log(response.data);
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setReady(true);
          console.log("OBJ PAGE URL: ", response.data.url);
          console.log("OBJ PAGE KEYS: ", response.data.keys);
        })
        .catch((error) => console.log(error));
      axiosInstance
        .get(`questionnaires/${pk}/results/`)
        .then((response) => {
          setData(response.data);

          console.log("RED2:", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <PageContainer seoEdit={false} backgroundColor="#F5F5F5">
      {metadata && data && (
        <BaseContent maxWidth={1200} pt={4} pb={4}>
          <div style={{ paddingBottom: 16, display: "flex" }}>
            {!isSmallScreen && (
              <Typography variant="h3" className={classes.title}>
                {model.verbose_name}
              </Typography>
            )}
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              style={{ display: "flex" }}
              className={classes.breadCrumbs}
              classes={{ separator: classes.breadCrumbs }}
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
              <Typography
                color="textPrimary"
                style={{ fontSize: isSmallScreen ? "0.85rem" : "0.95rem" }}
              >
                Read
              </Typography>
            </Breadcrumbs>
          </div>
          <QuestionnaireAnalysis data={data} />
          <SurveyAnalysis data={data} />
        </BaseContent>
      )}
    </PageContainer>
  );
}

export default AnalysisPage;
