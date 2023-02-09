import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, CardMedia } from "@material-ui/core";
import Values from "../Values/Values";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";
import ContentEdit from "./ContentEdit";
import DOMPurify from "dompurify";
import Members from "../Members/Members";
import Contact from "../Contact/Contact/Contact";
import FAQAccordion from "../FAQ/FAQAccordion";
import EditButton from "../../Elements/Buttons/EditButton";
import AboutHeadingEdit from "../Heading/AboutHeadingEdit";
import Heading from "../Heading/Heading";

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
    fontWeight: 400,
  },
}));

export default function Content() {
  const [data, setData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [valuesData, setValuesData] = useState(null);
  const [membersData, setMembersData] = useState(null);
  const [contactData, setContactData] = useState(null);

  const [editTitle, setEditTitle] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [editValues, setEditValues] = useState(false);

  const [missionBody, setMissionBody] = useState(false);
  const [historyBody, setHistoryBody] = useState(false);

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
          setMembersData(response.data.team_members);
          setContactData(response.data.contact_information);
          setMissionBody(
            response.data.mission_statement.body.replace(/<br\s*[\/]?>/gi, "")
          );
          setHistoryBody(
            response.data.company_history.body.replace(/<br\s*[\/]?>/gi, "")
          );
          console.log(response.data);
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

  const handleEditTitle = () => {
    setEditTitle(!editTitle);
  };

  const handleEditMission = () => {
    setEditMission(!editMission);
  };

  const handleEditHistory = () => {
    setEditHistory(!editHistory);
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
            {!editTitle ? (
              <Heading data={data} />
            ) : (
              <Grid item xs={12} sm={12}>
                <AboutHeadingEdit aboutBlock={data} onUpdate={updateBlock} />
              </Grid>
            )}
            {auth.is_superuser ? (
              <EditButton
                onClick={() => setEditTitle(!editTitle)}
                editState={editTitle}
              />
            ) : null}
          </>

          <Grid item xs={12} sm={12} className={classes.section}>
            {!editMission ? (
              <>
                <Typography variant="h3" className={classes.sectionTitle}>
                  {missionData.title}
                </Typography>
                {missionBody ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(missionBody),
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
            {auth.is_superuser ? (
              <EditButton
                onClick={() => setEditMission(!editMission)}
                editState={editMission}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} className={classes.section}>
            {!editHistory ? (
              <>
                <Typography variant="h3" className={classes.sectionTitle}>
                  {historyData.title}
                </Typography>
                {historyBody ? (
                  <Typography
                    variant="body1"
                    className={classes.body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(historyBody),
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
            {auth.is_superuser ? (
              <EditButton
                onClick={() => setEditHistory(!editHistory)}
                editState={editHistory}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} className={classes.section}>
            {valuesData && !editValues ? (
              <Values valuesData={valuesData} />
            ) : null}
          </Grid>
          {membersData ? <Members membersData={membersData} /> : null}
          {contactData ? <Contact contactData={contactData} /> : null}
        </Grid>
      </Paper>
    </div>
  );
}
