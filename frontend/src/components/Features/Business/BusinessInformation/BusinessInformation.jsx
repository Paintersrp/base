import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, CardMedia } from "@material-ui/core";
import CoreValues from "../CompanyInfo/CoreValues";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";
import AboutHeadingEdit from "./AboutHeadingEdit";
import ContentEdit from "./ContentEdit";
import DOMPurify from "dompurify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    // backgroundColor: theme.palette.background.default,
    backgroundColor: "white",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
  section: {
    marginTop: theme.spacing(2),
    color: "black",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    color: "white",
    // backgroundColor: theme.palette.background.default,
    backgroundColor: "white",
    borderRadius: 14,
    maxWidth: 900,
    minWidth: 300,
  },
  media: {
    scale: "0.75",
    paddingTop: "56.25%", // 16:9 aspect ratio
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  body: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
  },
}));

export default function BusinessInformation() {
  const [data, setData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [valuesData, setValuesData] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [editValues, setEditValues] = useState(false);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/about/")
        .then((response) => {
          setData(response.data.about_block);
          setMissionData(response.data.mission_statement);
          setHistoryData(response.data.company_history);
          setValuesData(response.data.core_values);
          console.log(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const updateBlock = (updateBlock) => {
    setData(updateBlock);
    setEditTitle(false);
  };
  const updateMission = (updateMission) => {
    setMissionData(updateMission);
    setEditMission(false);
  };
  const updateHistory = (updateHistory) => {
    setHistoryData(updateHistory);
    setEditHistory(false);
  };
  const updateValues = (updateValues) => {
    setValuesData(updateValues);
    setEditValues(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid
          container
          spacing={2}
          style={{ display: "flex", justifyContent: "left" }}
        >
          <>
            {auth.is_superuser ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: 10,
                  marginLeft: 8,
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    width: 50,
                    color: "black",
                    borderColor: "grey",
                    height: 25,
                    fontSize: "0.75rem",
                  }}
                  onClick={() => setEditTitle(!editTitle)}
                >
                  {editTitle ? "Cancel" : "Edit"}
                </Button>
              </div>
            ) : null}
            {!editTitle ? (
              <>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h2" className={classes.title}>
                    About {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: 0, margin: 0 }}>
                  <CardMedia
                    className={classes.media}
                    image={`${data.image}`}
                    title="title"
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12}>
                <AboutHeadingEdit aboutBlock={data} onUpdate={updateBlock} />
              </Grid>
            )}
          </>

          <Grid item xs={12} sm={12} className={classes.section}>
            {auth.is_superuser ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: 10,
                  marginLeft: 8,
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    width: 50,
                    color: "black",
                    borderColor: "grey",
                    height: 25,
                    fontSize: "0.75rem",
                  }}
                  onClick={() => setEditMission(!editMission)}
                >
                  {editMission ? "Cancel" : "Edit"}
                </Button>
              </div>
            ) : null}
            {!editMission ? (
              <>
                <Typography variant="h3" className={classes.sectionTitle}>
                  {missionData.title}
                </Typography>
                {missionData.body1 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(missionData.body1),
                    }}
                  />
                ) : null}
                {missionData.body2 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(missionData.body2),
                    }}
                  />
                ) : null}
                {missionData.body3 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(missionData.body3),
                    }}
                  />
                ) : null}
              </>
            ) : (
              <ContentEdit
                content={missionData}
                onUpdate={updateMission}
                type={"mission"}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} className={classes.section}>
            {auth.is_superuser ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: 10,
                  marginLeft: 8,
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    width: 50,
                    color: "black",
                    borderColor: "grey",
                    height: 25,
                    fontSize: "0.75rem",
                  }}
                  onClick={() => setEditHistory(!editHistory)}
                >
                  {editHistory ? "Cancel" : "Edit"}
                </Button>
              </div>
            ) : null}
            {!editHistory ? (
              <>
                <Typography variant="h3" className={classes.sectionTitle}>
                  {historyData.title}
                </Typography>
                {historyData.body1 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(historyData.body1),
                    }}
                  />
                ) : null}
                {historyData.body2 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(historyData.body2),
                    }}
                  />
                ) : null}
                {historyData.body3 ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(historyData.body3),
                    }}
                  />
                ) : null}
              </>
            ) : (
              <ContentEdit
                content={historyData}
                onUpdate={updateHistory}
                type={"history"}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} className={classes.section}>
            {valuesData && !editValues ? (
              <CoreValues valuesData={valuesData} />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
