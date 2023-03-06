import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { CheckCircleOutline } from "@material-ui/icons";
import {
  CardMedia,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.light,
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 1200,
    backgroundColor: theme.palette.background.light,
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "8px",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  additionalInfo: {
    marginTop: theme.spacing(4),
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  price: {
    fontWeight: "bold",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
  },
  subtitle: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  keyFeatures: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0.5),
  },
  requirementItem: {
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  requirementIcon: {
    color: theme.palette.primary.main,
    minWidth: 40,
    marginBottom: theme.spacing(0),
  },
}));

function ServiceOverview(props) {
  const classes = useStyles();
  const { serviceName, serviceDescription, features, price } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              color="primary"
              style={{ marginBottom: 24 }}
            >
              {serviceName}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              {serviceDescription}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignContent: "start",
                alignItems: "start",
                height: "auto",
              }}
            >
              <Typography variant="h5" className={classes.keyFeatures}>
                Key Features
              </Typography>
              {features.map((feature) => (
                <ListItem
                  className={classes.requirementItem}
                  classes={{ root: classes.requirementItem }}
                >
                  <ListItemIcon className={classes.requirementIcon}>
                    <CheckCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              className={classes.image}
              image={"https://source.unsplash.com/801x601/?service"}
            />
          </Grid>
        </Grid>
        <div className={classes.additionalInfo}>
          <Typography variant="h5" className={classes.subtitle}>
            About Our {serviceName}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 8 }}>
            Our {serviceName} provides a comprehensive solution for businesses
            looking to establish their online presence. With our tier, we offer
            custom website design, mobile-responsive design, SEO optimization,
            website maintenance and updates, as well as other features such as
            hosting, security, and performance monitoring.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 8 }}>
            Our team of expert designers and developers work closely with our
            clients to ensure that their website reflects their brand and meets
            their specific needs. We provide ongoing support and maintenance to
            ensure that our clients' websites are always up-to-date and
            functioning at their best.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 16 }}>
            Our {serviceName} is perfect for businesses that want to establish a
            strong online presence and attract more customers. Whether you're
            just starting out or looking to upgrade your existing website, our
            service tier can help take your business to the next level.
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Our Process
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 8 }}>
            We follow a proven process to ensure that our clients' websites meet
            their specific needs and reflect their brand. Our process includes
            the following steps:
          </Typography>
          <ul style={{ marginBottom: 16 }}>
            <li>
              <Typography variant="body1" style={{ marginBottom: 2 }}>
                Discovery: We work closely with our clients to understand their
                business and goals, as well as their target audience and
                competitors.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" style={{ marginBottom: 2 }}>
                Design: We create a custom website design that reflects our
                clients' brand and meets their specific needs.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" style={{ marginBottom: 2 }}>
                Development: We use the latest web development technologies and
                best practices to build a website that is fast, secure, and
                user-friendly.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" style={{ marginBottom: 2 }}>
                Testing: We rigorously test our clients' websites to ensure that
                they are functioning at their best and are free from bugs and
                errors.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" style={{ marginBottom: 2 }}>
                Launch: We launch our clients' websites and provide ongoing
                support and maintenance to ensure that they are always
                up-to-date and functioning at their best.
              </Typography>
            </li>
          </ul>
          <Typography variant="h5" className={classes.subtitle}>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Contact us today to learn more about our {serviceName} service tier
            and how it can help take your business to the next level. We look
            forward to hearing from you!
          </Typography>
        </div>
        <div className={classes.priceContainer}>
          <Typography
            variant="h3"
            color="primary"
            className={classes.price}
            style={{ marginBottom: 8 }}
          >
            {price}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Sign Up Now
          </Button>
        </div>
      </Paper>
    </div>
  );
}

ServiceOverview.propTypes = {
  serviceName: PropTypes.string.isRequired,
  serviceDescription: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
};

export default ServiceOverview;
