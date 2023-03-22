import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Values from "../Values/Values";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import AboutHeadingEdit from "../Heading/AboutHeadingEdit";
import Heading from "../Heading/Heading";
import ContentSection from "../Content/ContentSection";
import useInput from "../../../hooks/useInput";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import Container from "../../Elements/Layout/Container/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    marginTop: 20,
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
    backgroundColor: theme.palette.background.default,
    borderRadius: 14,
    maxWidth: 900,
    minWidth: 300,
  },
  gridContainer: {
    background: theme.palette.background.default,
    display: "flex",
    justifyContent: "left",
  },
}));

export default function About({ setError, editMode = false }) {
  const {
    value: missionData,
    handleChange: handleChangeMission,
    setValue: setMissionData,
  } = useInput([]);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  const [data, setData] = useState([]);
  // const [metadata, setMetaData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [valuesData, setValuesData] = useState(null);

  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [missionBody, setMissionBody] = useState(false);
  const [historyBody, setHistoryBody] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/about/")
        .then((response) => {
          setData(response.data.AboutBlock);
          setMissionData(response.data.MissionStatement);
          setHistoryData(response.data.CompanyHistory);
          setValuesData(response.data.Value);
          setMissionBody(
            response.data.MissionStatement.body.replace(/<br\s*[\/]?>/gi, "")
          );
          setHistoryBody(
            response.data.CompanyHistory.body.replace(/<br\s*[\/]?>/gi, "")
          );
          // setMetaData(response.data.metadata);
        })
        .then(dispatch({ type: "FETCH_DATA_SUCCESS" }))
        .catch((err) => {
          setError(err.error);
        })
        .then(dispatch({ type: "FETCH_DATA_FAILURE" }));
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
            <Grid container spacing={2} className={classes.gridContainer}>
              <>
                {!editTitle && editMode ? (
                  <Container justify="flex-end">
                    <EditDeleteButtonMenu
                      hideDelete
                      editClick={() => setEditTitle(!editTitle)}
                      position="end"
                      placement="bottom"
                      adminLink="aboutblock"
                      text="About Header"
                    />
                  </Container>
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
                editMode={editMode}
                adminLink="missionstatement"
                text="Mission Statement"
              />
              <ContentSection
                title={historyData.title}
                body={historyBody}
                editState={editHistory}
                setEdit={setEditHistory}
                onUpdate={updateHistory}
                type={"companyhistory"}
                auth={auth}
                editMode={editMode}
                adminLink="companyhistory"
                text="Company History"
              />
              <Grid item xs={12} sm={12} className={classes.section}>
                {valuesData ? (
                  <Values valuesData={valuesData} editMode={editMode} />
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </>
  );
}
