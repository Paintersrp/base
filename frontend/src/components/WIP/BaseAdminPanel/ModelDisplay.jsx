import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

function ModelDisplay() {
  const classes = useStyles();
  const [models, setModels] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data);
        console.log("models: ", response.data);
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
          <ListItem>
            <ListItemText
              primary={model.model_name}
              secondary={`URL: ${model.url}`}
            />
          </ListItem>
        </Link>
      ));
  };
  const renderAppList = () => {
    const sections = [];

    for (const [app, appModels] of Object.entries(models)) {
      sections.push(
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <BaseContent pt={2} pr={2} pl={2}>
            <div key={app} className={classes.section}>
              <Typography variant="h3" align="center" className={classes.title}>
                {app.charAt(0).toUpperCase() + app.slice(1)}
              </Typography>
              <List>{renderModelList(appModels)}</List>
            </div>
          </BaseContent>
        </Grid>
      );
      sections.push(<Divider key={`${app}-divider`} />);
    }

    return sections;
  };

  return (
    <BaseContent maxWidth={1200}>
      {Object.keys(models).length > 0 ? (
        <div style={{ width: "100%" }}>
          <Typography variant="h2" align="center">
            Model List
          </Typography>
          <Grid container>{renderAppList()}</Grid>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BaseContent>
  );
}

export default ModelDisplay;
