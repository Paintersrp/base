import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Breadcrumbs,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
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
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(3, 2, 1, 2),
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
  breadCrumbTitleMain: {
    textAlign: "center",
    color: "black",
    marginRight: 16,
    paddingRight: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
  collapseAllContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
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
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
    fontSize: "2rem",
  },
  hoverLink: {
    "&:hover": {
      background: "rgba(0, 0, 0, 0.2)",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  hoverAppLink: {
    "&:hover": {
      color: theme.palette.secondary.main,
      textDecoration: "underline",
      textDecorationThickness: "0.1em",
      textUnderlineOffset: "0.25em",
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  dashContainer: {
    justifyContent: "center",
  },
  dashInnerContainer: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "75%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [configs, setConfigs] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});
  const [recentActions, setRecentActions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        setModels(response.data.models);
        setConfigs(response.data.configs);
        console.log("Models: ", response.data.models.authorization);

        const initialOpenAppSections = {};
        Object.keys(response.data.models).forEach((app) => {
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
    <BaseContent maxWidth={1200} pt={4} pb={4} pad={isSmallScreen ? 3 : 3}>
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
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>

          <Grid container className={classes.dashContainer}>
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
            <Grid container className={classes.dashInnerContainer}>
              {renderSections({
                models,
                configs,
                openAppSections,
                setOpenAppSections,
                classes,
              })}
            </Grid>
            <RecentActions
              actionsOpen={actionsOpen}
              setActionsOpen={setActionsOpen}
              recentActions={recentActions}
            />
          </Grid>

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
