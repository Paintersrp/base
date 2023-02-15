import React from "react";
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
} from "@material-ui/core";
import { FaCheck } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    minHeight: 650,
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
  highlighted: {
    border: "2px solid gold",
  },
}));

const SelectedService = ({ service, highlighted = false }) => {
  const classes = useStyles();

  return (
    <Card
      className={
        highlighted ? `${classes.root} ${classes.highlighted}` : classes.root
      }
    >
      <Grid container flex style={{ flexDirection: "column", width: "100%" }}>
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
                <Typography variant="h5">{service.title}</Typography>
                <Typography variant="subtitle1">
                  Hourly Price: {service.price}
                </Typography>
                <Typography variant="subtitle1">
                  {service.description}
                </Typography>
              </CardContent>
              <List dense className={classes.list}>
                <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                  <ListItemText primary="Features:" />
                </ListItem>
                {service.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FaCheck />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <List dense className={classes.list}>
                <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                  <ListItemText primary={`${service.details.header}:`} />
                </ListItem>
                {service.details.sections.map((relatedService) => (
                  <ListItem key={relatedService.id}>
                    <ListItemText primary={relatedService.title} />
                  </ListItem>
                ))}
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
