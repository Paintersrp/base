import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemIcon,
  CardActionArea,
  Badge,
} from "@material-ui/core";
import { FaCheck } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    minHeight: 625,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  content: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flex: 1,
  },
  list: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(0),
    "& .MuiListItemIcon-root": {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      minWidth: 30,
    },
    "& .MuiListItem-root": {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },

  description: {
    paddingTop: theme.spacing(1),
  },
  price: {
    paddingTop: theme.spacing(1),
  },
  featureIcon: {
    color: theme.palette.primary.main,
  },
  recommendedBadge: {
    position: "absolute",
    top: "2.5%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "& .MuiBadge-badge": {
      fontSize: "0.9rem",
      padding: theme.spacing(1.5),
      fontWeight: 800,
      borderRadius: theme.spacing(1),
    },
  },
}));

const SelectedService = ({ service, active, recommendedId }) => {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className={`${classes.root} `}
      style={{
        minHeight: 400,
        width: active ? 350 : 350,
        opacity: active ? 1 : hovered ? 0.7 : 0.5,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Grid
        container
        flex
        style={{
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {recommendedId === service.id && (
          <Badge
            color="secondary"
            badgeContent="Recommended"
            className={classes.recommendedBadge}
          />
        )}

        <Grid xs={12} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <Grid xs={12}>
              <CardMedia
                className={classes.cardMedia}
                image={service.image}
                title={service.title}
              />
            </Grid>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="h2">{service.title}</Typography>
                <Typography variant="subtitle2" className={classes.description}>
                  Monthly Price: ${service.price}
                </Typography>
              </CardContent>
              <List dense className={classes.list}>
                <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                  <ListItemText primary="Features:" />
                </ListItem>
                {service.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FaCheck className={classes.featureIcon} />
                    </ListItemIcon>
                    <ListItemText secondary={feature.detail} />
                  </ListItem>
                ))}
              </List>
              <List dense className={classes.list}>
                <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                  <ListItemText
                    primary="Best For:"
                    secondary={`${service.bestFor}:`}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Grid>
        <Grid xs={12}>
          <CardActionArea>
            <Grid container flex justifyContent="center">
              <Button
                size="large"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Book a Service
              </Button>
            </Grid>
          </CardActionArea>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SelectedService;
