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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import { NavigateNext } from "@material-ui/icons";
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

function ModelDisplay() {
  const classes = useStyles();
  const [models, setModels] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});

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

  const renderModelList = (modelList) => {
    return modelList
      .filter((model) => model.url !== null)
      .map((model) => (
        <Link
          to={`/admin/${model.model_name}`}
          state={{ url: model.url, keys: model.keys }}
          key={model.model_name}
        >
          <ListItem button style={{ color: "black" }}>
            <ListItemIcon style={{ color: "black" }}>
              <NavigateNext />
            </ListItemIcon>

            <ListItemText
              primary={
                model.model_name.charAt(0).toUpperCase() +
                model.model_name.slice(1)
              }
            />
          </ListItem>
        </Link>
      ));
  };

  const renderAppList = () => {
    const sections = [];

    for (const [app, appModels] of Object.entries(models)) {
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
            />
            <Collapse in={isOpen}>
              <CardContent>
                <List>{renderModelList(appModels)}</List>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      );
      sections.push(<Divider key={`${app}-divider`} />);
    }

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
            <Link style={{ color: "black" }} to="/admin">
              Admin
            </Link>
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
          <Grid container>{renderAppList()}</Grid>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BaseContent>
  );
}

export default ModelDisplay;
