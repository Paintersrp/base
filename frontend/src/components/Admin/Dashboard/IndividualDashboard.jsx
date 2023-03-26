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
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import Loading from "../../Elements/Layout/Loading/Loading";
import RecentActions from "./RecentActions";
import { Link, useParams } from "react-router-dom";
import { renderIcon } from "./renderIcon";
import { NavigateNext, Add } from "@material-ui/icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AppDetailsPanel from "./AppDetailsPanel";
import LinkIcon from "@mui/icons-material/Link";
import PageContainer from "../../Elements/Layout/PageContainer";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: theme.spacing(1, 3, 3, 3),
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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  breadCrumbs: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
}));

function IndividualDashboard() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [config, setConfig] = useState({});
  const [recentActions, setRecentActions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(true);
  const [appStatsOpen, setAppStatsOpen] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { str } = useParams();

  const handleCollapseAll = () => {
    setAppOpen(false);
    setAppStatsOpen(false);
    setActionsOpen(false);
    setLinksOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    setAppOpen(true);
    setAppStatsOpen(true);
    setActionsOpen(true);
    setLinksOpen(true);
    setCollapsed(false);
  };

  const toggleAppOpen = () => {
    setAppOpen(!appOpen);
  };

  const toggleLinksOpen = () => {
    setLinksOpen(!linksOpen);
  };
  const toggleAppStatsOpen = () => {
    setAppStatsOpen(!appStatsOpen);
  };

  useEffect(() => {
    axiosInstance
      .get(`/get_app/${str}/`)
      .then((response) => {
        setModels(response.data.models);
        setConfig(response.data.config);
        console.log("ya: ", response.data.config);
        setAppOpen(true);
        setAppStatsOpen(true);
        setActionsOpen(true);
        setLinksOpen(true);
      })
      .catch((error) => console.log(error));

    axiosInstance
      .get(`/recent_admin_actions/?app=${str}`)
      .then((response) => {
        setRecentActions(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <PageContainer backgroundColor="#F5F5F5" seoEdit={false}>
      <BaseContent maxWidth={1200} pt={4} pb={4}>
        {Object.keys(models).length > 0 ? (
          <>
            {!isSmallScreen && (
              <Typography variant="h3" className={classes.breadCrumbTitle}>
                App Overview
              </Typography>
            )}
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              style={{ display: "flex" }}
              className={classes.breadCrumbs}
              classes={{ separator: classes.breadCrumbs }}
            >
              <Tooltip
                title={`Dashboard`}
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Link className={classes.activeLink} to="/admin">
                  Dashboard
                </Link>
              </Tooltip>
              <Typography color="textPrimary">
                {str.charAt(0).toUpperCase() + str.slice(1)}
              </Typography>
            </Breadcrumbs>
            <Grid container style={{ width: "100%" }}>
              <div style={{ width: "100%", marginTop: 32 }}>
                <Typography
                  variant="h2"
                  align="center"
                  style={{ color: "black" }}
                >
                  {str.charAt(0).toUpperCase() + str.slice(1)} App Overview
                </Typography>
              </div>
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

              <Grid
                container
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={str}
                  style={{ order: isSmallScreen ? 3 : 1, width: "100%" }}
                >
                  <AppDetailsPanel
                    appName={str}
                    numModels={config.app_info.num_models}
                    numObjects={config.app_info.num_objects}
                    models={config.app_info.models}
                    open={appStatsOpen}
                    toggleOpen={toggleAppStatsOpen}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={str}
                  style={{ order: isSmallScreen ? 1 : 2 }}
                >
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
                          color="secondary"
                          onClick={toggleAppOpen}
                        >
                          {appOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      }
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {renderIcon(str, classes.modelIcon)}
                          <Typography variant="h3">
                            Models
                            {/* {str.charAt(0).toUpperCase() + str.slice(1)} Models */}
                          </Typography>
                        </div>
                      }
                    />
                    <Collapse in={appOpen}>
                      <CardContent
                        className={classes.background}
                        classes={{ root: classes.cardContent }}
                      >
                        <List container>
                          {Object.entries(models).map(
                            ([appName, model], index) => {
                              if (model[0].visibility === false) {
                                return null;
                              }
                              return (
                                <Tooltip
                                  title={`View ${model[0].verbose_name} Model`}
                                  placement="right"
                                  classes={{ tooltip: classes.tooltip }}
                                >
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
                                </Tooltip>
                              );
                            }
                          )}
                        </List>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={str}
                  style={{ order: isSmallScreen ? 2 : 3 }}
                >
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
                          color="secondary"
                          onClick={toggleLinksOpen}
                        >
                          {linksOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      }
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <LinkIcon className={classes.modelIcon} />
                          <Typography variant="h3">Quick Links</Typography>
                        </div>
                      }
                    />
                    <Collapse in={linksOpen}>
                      <CardContent
                        className={classes.background}
                        classes={{ root: classes.cardContent }}
                      >
                        <List container>
                          {config.links &&
                            Object.entries(config.links).map(
                              ([linkName, link], index) => {
                                console.log(linkName, "linkName");
                                if (linkName.includes("Analysis")) {
                                  console.log("ass");
                                }
                                return (
                                  <Tooltip
                                    title={`View ${linkName}`}
                                    placement="right"
                                    classes={{ tooltip: classes.tooltip }}
                                  >
                                    <Link
                                      to={`${link}`}
                                      state={{
                                        appName: linkName.includes("Analysis")
                                          ? null
                                          : str,
                                      }}
                                      key={linkName}
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

                                        <ListItemText primary={linkName} />
                                      </ListItem>
                                    </Link>
                                  </Tooltip>
                                );
                              }
                            )}
                        </List>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <RecentActions
              actionsOpen={actionsOpen}
              setActionsOpen={setActionsOpen}
              recentActions={recentActions}
              appName={str}
            />
          </>
        ) : (
          <div>
            <Loading loading={true} />
          </div>
        )}
      </BaseContent>
    </PageContainer>
  );
}

export default IndividualDashboard;
