import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Breadcrumbs,
  IconButton,
  Collapse,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  ListItemText,
  Card,
  CardHeader,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import Loading from "../../Elements/Layout/Loading/Loading";
import renderSections from "./renderSections";
import RecentActions from "./RecentActions";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";
import { renderIcon } from "./renderIcon";
import { NavigateNext, Add } from "@material-ui/icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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

function IndividualDashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [configs, setConfigs] = useState({});
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

  const appName = "authorization";
  const isOpen = true;

  useEffect(() => {
    axiosInstance
      .get("/get_app/authorization/")
      .then((response) => {
        setModels(response.data.models);

        console.log("Models: ", response.data.models);

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
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} sm={6} md={6} lg={6} key={appName}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    action={
                      <IconButton
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                        onClick={console.log("tits")}
                      >
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    }
                    title={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {renderIcon(appName, classes.modelIcon)}
                        <Typography variant="h3">
                          {appName.charAt(0).toUpperCase() + appName.slice(1)}
                        </Typography>
                      </div>
                    }
                  />
                  <Collapse in={true}>
                    <CardContent
                      className={classes.background}
                      classes={{ root: classes.cardContent }}
                    >
                      <List container>
                        {Object.entries(models).map(
                          ([appName, model], index) => {
                            console.log("titty", model[0]);
                            return (
                              <Link
                                to={`/admin/${model[0].model_name}`}
                                state={{
                                  url: model[0].url,
                                  keys: model[0].keys,
                                  appName: appName,
                                  model: model[0],
                                  metadata: model[0].metadata,
                                  searchKeys: model[0].search_keys,
                                }}
                                key={model[0].model_name}
                              >
                                <ListItem
                                  button
                                  style={{ color: "black" }}
                                  className={classes.hoverLink}
                                >
                                  <ListItemIcon
                                    style={{
                                      color: "black",
                                    }}
                                  >
                                    <NavigateNext />
                                  </ListItemIcon>

                                  <ListItemText
                                    primary={model[0].verbose_name}
                                  />

                                  <Link
                                    to={`/admin/${model[0].model_name}/control`}
                                  >
                                    <ListItemIcon
                                      style={{
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Tooltip title="Add" placement="top">
                                        <IconButton
                                          className={classes.addButton}
                                          size="small"
                                        >
                                          <Add />
                                        </IconButton>
                                      </Tooltip>
                                    </ListItemIcon>
                                  </Link>
                                </ListItem>
                              </Link>
                            );
                          }
                        )}
                      </List>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </div>
            <Grid container>
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

export default IndividualDashboard;
