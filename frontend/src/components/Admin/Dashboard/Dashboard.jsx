import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Breadcrumbs,
  IconButton,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import Loading from "../../Elements/Layout/Loading";
import renderSections from "./renderSections";
import { NavigateNext } from "@material-ui/icons";
import RecentActions from "./RecentActions";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

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
  activeLink: {
    color: "#007bff",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});
  const [recentActions, setRecentActions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const handleCollapseAll = () => {
    const closedAppSections = {};
    Object.keys(models).forEach((app) => {
      closedAppSections[app] = false;
    });
    setOpenAppSections(closedAppSections);
    setActionsOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    const initialOpenAppSections = {};
    Object.keys(models).forEach((app) => {
      initialOpenAppSections[app] = true;
    });
    setOpenAppSections(initialOpenAppSections);
    setActionsOpen(true);
    setCollapsed(false);
  };

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
        setActionsOpen(true);
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
        <>
          <Typography
            variant="h3"
            style={{
              textAlign: "center",
              color: "black",
              borderRight: "1px solid #666666",
              marginRight: 16,
              paddingRight: 16,
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            Dashboard
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            style={{ display: "flex" }}
          >
            <Link className={classes.activeLink} to="/admin">
              Home
            </Link>
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
          <div style={{ width: "100%", color: "black" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography color="textPrimary">
                {collapsed ? "Open All" : "Collapse All"}
              </Typography>
              <IconButton
                onClick={collapsed ? handleOpenAll : handleCollapseAll}
              >
                {collapsed ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            </div>

            <Grid container>
              {renderSections({
                models,
                openAppSections,
                setOpenAppSections,
                classes,
              })}
              <Grid item xs={12}>
                <RecentActions
                  actionsOpen={actionsOpen}
                  setActionsOpen={setActionsOpen}
                  recentActions={recentActions}
                />
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <div>
          <Loading loading={true} />
        </div>
      )}
    </BaseContent>
  );
}

export default Dashboard;
