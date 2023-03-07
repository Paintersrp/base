import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CheckCircleOutline } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from "../../Elements/Layout/Container/Container";
import Item from "../../Elements/Layout/Item/Item";

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

function ServiceFeatures({ data }) {
  const classes = useStyles();

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
        <Typography variant="h5" align="center" className={classes.keyFeatures}>
          Key Features
        </Typography>
        {data.features.map((feature, index) => (
          <ListItem
            className={classes.featureItem}
            classes={{ root: classes.featureItem }}
            key={feature.id}
          >
            <ListItemIcon
              className={
                index % 2 === 0 ? classes.iconSecondary : classes.iconPrimary
              }
            >
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText primary={feature.detail} />
          </ListItem>
        ))}
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
        <Typography
          variant="h5"
          align="center"
          className={classes.supportedSites}
        >
          Supported Sites
        </Typography>
        {data.supported_sites.map((site, index) => (
          <ListItem
            className={classes.siteItem}
            classes={{ root: classes.siteItem }}
          >
            <ListItemIcon
              className={
                index % 2 === 0 ? classes.iconSecondary : classes.iconPrimary
              }
            >
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText primary={site.detail} />
          </ListItem>
        ))}
      </Item>
    </Container>
  );
}

export default ServiceFeatures;
