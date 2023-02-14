import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    alignSelf: "center",
    marginTop: theme.spacing(0.5),
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  offeringList: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  offeringItem: {
    marginBottom: theme.spacing(0),
  },
  offeringIcon: {
    marginRight: theme.spacing(0),
    color: theme.palette.primary.main,
    minWidth: 30,
  },
  price: {
    margin: theme.spacing(1, 0, 1, 0),
    fontWeight: "bold",
    textAlign: "center",
  },
}));

const ServiceCardHeader = ({
  title,
  description,
  offerings,
  pricing,
  link,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        className={classes.title}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        color="textSecondary"
        className={classes.description}
      >
        {description}
      </Typography>
      <List dense className={classes.offeringList}>
        {offerings.map((offering, index) => (
          <ListItem key={index} className={classes.offeringItem}>
            <ListItemIcon className={classes.offeringIcon}>
              <CheckCircleOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={offering} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" component="h2" className={classes.price}>
        {pricing}
      </Typography>
      <Grid container justifyContent="center">
        <Button
          href={link}
          color="primary"
          variant="contained"
          size="small"
          className={classes.button}
        >
          Learn More
        </Button>
      </Grid>
    </>
  );
};

export default ServiceCardHeader;
