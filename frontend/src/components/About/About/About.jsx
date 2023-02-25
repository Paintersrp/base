import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Values from "../Values/Values";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useSelector } from "react-redux";
import EditButton from "../../Elements/Buttons/EditButton";
import AboutHeadingEdit from "../Heading/AboutHeadingEdit";
import Heading from "../Heading/Heading";
import ContentSection from "../Content/ContentSection";
import useInput from "../../../hooks/useInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
  },
  section: {
    marginTop: theme.spacing(2),
    color: "black",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 14,
    maxWidth: 900,
    minWidth: 300,
  },
}));

export default function About() {
  const {
    value: missionData,
    handleChange: handleChangeMission,
    setValue: setMissionData,
  } = useInput([]);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  const [data, setData] = useState([]);

  // const [missionData, setMissionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [valuesData, setValuesData] = useState(null);

  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [missionBody, setMissionBody] = useState(false);
  const [historyBody, setHistoryBody] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/about/")
        .then((response) => {
          setData(response.data.about_block);
          setMissionData(response.data.mission_statement);
          setHistoryData(response.data.company_history);
          setValuesData(response.data.core_values);
          setMissionBody(
            response.data.mission_statement.body.replace(/<br\s*[\/]?>/gi, "")
          );
          setHistoryBody(
            response.data.company_history.body.replace(/<br\s*[\/]?>/gi, "")
          );
        })
        .catch((err) => {
          console.log(err);
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
    setMissionBody(updateMission.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditMission(false);
  };
  const updateHistory = (updateHistory) => {
    setHistoryData(updateHistory);
    setHistoryBody(updateHistory.body.replace(/<br\s*[\/]?>/gi, ""));
    setEditHistory(false);
  };

  return (
    <>
      {missionData && (
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={0}>
            <Grid
              container
              spacing={2}
              style={{ display: "flex", justifyContent: "left" }}
            >
              <>
                {!editTitle && auth.is_superuser ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <EditButton
                      onClick={() => setEditTitle(!editTitle)}
                      editState={editTitle}
                      position="end"
                    />
                  </div>
                ) : null}
                {!editTitle ? (
                  <Heading data={data} />
                ) : (
                  <Grid item xs={12} sm={12}>
                    <AboutHeadingEdit
                      aboutBlock={data}
                      onUpdate={updateBlock}
                      handleCancel={() => setEditTitle(!editTitle)}
                    />
                  </Grid>
                )}
              </>
              <ContentSection
                title={missionData.title}
                body={missionBody}
                editState={editMission}
                setEdit={setEditMission}
                onUpdate={updateMission}
                type={"missionstatement"}
                auth={auth}
              />
              <ContentSection
                title={historyData.title}
                body={historyBody}
                editState={editHistory}
                setEdit={setEditHistory}
                onUpdate={updateHistory}
                type={"companyhistory"}
                auth={auth}
              />
              <Grid item xs={12} sm={12} className={classes.section}>
                {valuesData ? <Values valuesData={valuesData} /> : null}
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </>
  );
}
