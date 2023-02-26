import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Breadcrumbs,
  ListItemIcon,
  IconButton,
  Collapse,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import { NavigateNext } from "@material-ui/icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Loading from "../../Elements/Layout/Loading";

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
    backgroundColor: "#F5F5F5",
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
  const theme = useTheme();

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data);
        console.log("models: ", response.data);

        const initialOpenAppSections = {};
        Object.keys(response.data).forEach((app) => {
          initialOpenAppSections[app] = true;
        });
        setOpenAppSections(initialOpenAppSections);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderModelList = (modelList, appName) => {
    return modelList
      .filter((model) => model.url !== null)
      .map((model) => (
        <Link
          to={`/admin/${model.model_name}`}
          state={{
            url: model.url,
            keys: model.keys,
            appName: appName,
            model: model,
          }}
          key={model.model_name}
        >
          <ListItem button style={{ color: "black" }}>
            <ListItemIcon style={{ color: "black" }}>
              <NavigateNext />
            </ListItemIcon>

            <ListItemText primary={model.verbose_name} />
          </ListItem>
        </Link>
      ));
  };

  const renderAppList = () => {
    const sections = [];

    Object.entries(models).map(([app, appModels], index) => {
      if (app === "authorization") {
        return null;
      }
      const isOpen = Boolean(openAppSections[app]);
      const toggleOpen = () =>
        setOpenAppSections((prev) => ({ ...prev, [app]: !isOpen }));

      sections.push(
        <Grid item xs={12} sm={6} md={6} lg={4} key={app}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              action={
                <IconButton onClick={toggleOpen}>
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              }
              title={
                <Typography variant="h3">
                  {app.charAt(0).toUpperCase() + app.slice(1)}
                </Typography>
              }
              // style={{
              //   transition: "border 0.3s ease-in-out",
              //   border:
              //     "2px solid " +
              //     (index % 2 === 0
              //       ? theme.palette.primary.main
              //       : theme.palette.secondary.main),
              //   borderBottom: isOpen
              //     ? "0px"
              //     : "2px solid " +
              //       (index % 2 === 0
              //         ? theme.palette.primary.main
              //         : theme.palette.secondary.main),
              // }}
            />
            <Collapse in={isOpen}>
              <CardContent
              // style={{
              //   transition: "border 0.3s ease-in-out",
              //   border:
              //     "2px solid " +
              //     (index % 2 === 0
              //       ? theme.palette.primary.main
              //       : theme.palette.secondary.main),
              //   borderTop: "0px",
              // }}
              >
                <List>{renderModelList(appModels, app)}</List>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      );
    });

    return sections;
  };

  return (
    <BaseContent maxWidth={1200} pt={4} pb={4}>
      {Object.keys(models).length > 0 ? (
        <div style={{ width: "100%", color: "black" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {/* <Link style={{ color: "black" }} to="/admin">
              Admin
            </Link> */}
            <Typography color="textPrimary">Admin Dashboard</Typography>
          </Breadcrumbs>
          <Grid container>{renderAppList()}</Grid>
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
