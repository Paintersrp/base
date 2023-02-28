import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Breadcrumbs,
  Card,
  CardContent,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import Loading from "../../Elements/Layout/Loading";
import renderSections from "./renderSections";
import { NavigateNext } from "@material-ui/icons";
import RecentActions from "./RecentActions";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 24,
  },
  cardHeader: {
    backgroundColor: "#E6E6E6",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});
  const [recentActions, setRecentActions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data);

        const initialOpenAppSections = {};
        Object.keys(response.data).forEach((app) => {
          initialOpenAppSections[app] = true;
        });
        setOpenAppSections(initialOpenAppSections);
      })
      .catch((error) => console.log(error));

    axiosInstance
      .get("/recent_admin_actions/")
      .then((response) => {
        setRecentActions(response.data);
        console.log("recent actions: ", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BaseContent maxWidth={1200} pt={4} pb={4}>
      {Object.keys(models).length > 0 ? (
        <div style={{ width: "100%", color: "black" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Typography color="textPrimary">Admin Dashboard</Typography>
          </Breadcrumbs>

          <Grid container>
            {renderSections({
              models,
              openAppSections,
              setOpenAppSections,
              classes,
            })}
            <Grid item xs={12}>
              <RecentActions models={models} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <Loading loading={true} />
        </div>
      )}
    </BaseContent>
  );
}

export default Dashboard;
