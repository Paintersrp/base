import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Button } from "@material-ui/core";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock";
import FloatingFeature from "./FloatingFeature";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import TitleBlockEditor from "../../Elements/TextBlocks/TitleBlockEditor";
import EditButton from "../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    minHeight: 550,
    minWidth: 325,
    padding: 0,
    margin: 0,
    marginBottom: 40,
    backgroundColor: "#242424",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "#212121",
    boxShadow: theme.shadows[7],
    borderRadius: 14,
    maxWidth: 1400,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    minWidth: 350,
    marginTop: 10,
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function OurProcess() {
  const classes = useStyles();
  const [block, setBlock] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get("/titleblock/process/")
      .then((response) => {
        setBlock(response.data);
      })
      .catch((err) => {
        setError(err);
      });

    axiosInstance
      .get("/processes/")
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const updateTitleBlock = (updateTitleBlock) => {
    setBlock(updateTitleBlock);
    setEditTitle(false);
  };

  const updateProcesses = (updateProcesses) => {
    setProcesses(updateProcesses);
    setEditing(false);
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <Paper elevation={0} className={classes.paper}>
            {auth.is_superuser ? (
              <EditButton
                onClick={() => setEditTitle(!editTitle)}
                editState={editTitle}
                color="white"
              />
            ) : null}
            {!editTitle ? (
              <TitleBlock
                subtitle={block.subtitle}
                title={block.title}
                alignment={block.alignment}
                showDivider={block.show_divider}
              />
            ) : (
              <TitleBlockEditor
                titleBlock={block}
                onUpdate={updateTitleBlock}
              />
            )}
            <Grid container spacing={2} className={classes.gridContainer}>
              {processes.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  className={classes.center}
                >
                  <FloatingFeature step={step} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
