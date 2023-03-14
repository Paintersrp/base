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
import Loading from "../../Elements/Layout/Loading/Loading";
import renderSections from "./renderSections";
import { NavigateNext } from "@material-ui/icons";
import RecentActions from "./RecentActions";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";

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
    padding: theme.spacing(3, 2, 1, 2),
    backgroundColor: "#E6E6E6",
    alignItems: "flex-start",
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
  breadCrumbTitle: {
    textAlign: "center",
    color: "black",
    borderRight: "1px solid #666666",
    marginRight: 16,
    paddingRight: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
  collapseAllContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    background: "#F5F5F5",
    padding: theme.spacing(2),
    "& .MuiCardContent-root:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  cardContent: {
    paddingBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  addButton: {
    color: theme.palette.success.main,
    "&:hover": {
      color: theme.palette.success.dark,
    },
  },
  launchButton: {
    color: theme.palette.info.dark,
    "&:hover": {
      color: theme.palette.info.light,
    },
  },
  modelIcon: {
    color: theme.palette.info.dark,
    marginRight: theme.spacing(2),
    fontSize: "2rem",
  },
  hoverLink: {
    "&:hover": {
      background: "rgba(0, 0, 0, 0.2)",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});
  const [recentActions, setRecentActions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const handleCollapseAll = () => {
    const closedAppSections = {};
    Object.keys(models).forEach((app) => {
      closedAppSections[app] = false;
    });
    setOpenAppSections(closedAppSections);
    setActionsOpen(false);
    setStatsOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    const initialOpenAppSections = {};
    Object.keys(models).forEach((app) => {
      initialOpenAppSections[app] = true;
    });
    setOpenAppSections(initialOpenAppSections);
    setActionsOpen(true);
    setStatsOpen(true);
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
        setStatsOpen(true);
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
          <Typography variant="h3" className={classes.breadCrumbTitle}>
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
          <div>
            <div className={classes.collapseAllContainer}>
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
          <Statistics
            statsOpen={statsOpen}
            setStatsOpen={setStatsOpen}
            numCustomers={1000}
            avgSatisfaction={4.5}
            numProjectsCompleted={500}
            revenue={10000}
            teamSize={10}
          />
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
