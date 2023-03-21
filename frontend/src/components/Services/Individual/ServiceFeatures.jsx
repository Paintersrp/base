import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CheckCircleOutline } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from "../../Elements/Layout/Container/Container";
import Item from "../../Elements/Layout/Item/Item";
import ServiceFeaturesEdit from "./ServicePriceEdit";
import AdminButton from "../../Elements/Buttons/AdminButton";
import ManyToManyEdit from "./ManyToManyEdit";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";

const useStyles = makeStyles((theme) => ({
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },

  keyFeatures: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5),
  },
  supportedSites: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5),
  },
  featureItem: {
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  featureIcon: {
    color: theme.palette.primary.main,
    minWidth: 40,
    marginBottom: theme.spacing(0),
  },
  siteItem: {
    display: "flex",
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    textAlign: "start",
  },
  iconPrimary: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0),
  },
  iconSecondary: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
  },
}));

function ServiceFeatures({ data, editMode }) {
  const classes = useStyles();
  const [featureData, setFeatureData] = useState(data);
  const [featureEditing, setFeatureEditing] = useState(false);
  const [supportedEditing, setSupportedEditing] = useState(false);

  const updateSupportedData = (updateService) => {
    setFeatureData(updateService);
    setSupportedEditing(false);
  };

  const updateFeatureData = (updateFeatureData) => {
    setFeatureData(updateFeatureData);
    setFeatureEditing(false);
  };

  return (
    <Container
      direction="row"
      justify="center"
      align="start"
      style={{ marginTop: 24 }}
    >
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {!featureEditing ? (
          <>
            {!featureEditing && editMode ? (
              <div style={{ width: "100%" }}>
                <EditDeleteButtonMenu
                  editClick={() => setFeatureEditing(!featureEditing)}
                  hideDelete
                  position="start"
                  adminLink="servicetier"
                  text="Service Tier"
                  obj={featureData.id}
                />
              </div>
            ) : null}
            <Typography
              variant="h5"
              align="center"
              className={classes.keyFeatures}
            >
              Key Features
            </Typography>
            {featureData.features.map((feature, index) => (
              <ListItem
                className={classes.featureItem}
                classes={{ root: classes.featureItem }}
                key={feature.id}
              >
                <ListItemIcon
                  className={
                    index % 2 === 0
                      ? classes.iconSecondary
                      : classes.iconPrimary
                  }
                >
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary={feature.detail} />
              </ListItem>
            ))}
          </>
        ) : (
          <ManyToManyEdit
            data={featureData}
            updateData={updateFeatureData}
            endpoint="servicetier"
            handleCancel={() => setFeatureEditing(!featureEditing)}
            id={featureData.id}
            fieldName="features"
            title="Edit Features"
          />
        )}
      </Item>
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          width: "100%",
        }}
      >
        {!supportedEditing ? (
          <>
            {!supportedEditing && editMode ? (
              <div style={{ width: "100%" }}>
                <EditDeleteButtonMenu
                  editClick={() => setSupportedEditing(!supportedEditing)}
                  hideDelete
                  position="start"
                  adminLink="servicetier"
                  text="Service Tier"
                  obj={featureData.id}
                />
              </div>
            ) : null}
            <Typography
              variant="h5"
              align="center"
              className={classes.supportedSites}
            >
              Supported Sites
            </Typography>
            {featureData.supported_sites.map((site, index) => (
              <ListItem
                className={classes.siteItem}
                classes={{ root: classes.siteItem }}
              >
                <ListItemIcon
                  className={
                    index % 2 === 0
                      ? classes.iconSecondary
                      : classes.iconPrimary
                  }
                >
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary={site.detail} />
              </ListItem>
            ))}
          </>
        ) : (
          <ManyToManyEdit
            data={featureData}
            updateData={updateSupportedData}
            endpoint="servicetier"
            handleCancel={() => setSupportedEditing(!supportedEditing)}
            id={featureData.id}
            fieldName="supported_sites"
            title="Edit Supported Sites"
          />
        )}
      </Item>
    </Container>
  );
}

export default ServiceFeatures;
