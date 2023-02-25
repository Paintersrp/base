import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import CaseStudies from "./CaseStudies";
import { caseStudiesData } from "./caseStudyData";
import ServiceCardHeader from "./ServiceCardHeader";

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
    marginTop: "auto",
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
  },
  price: {
    fontWeight: "bold",
  },
}));

const ServiceCard = ({
  title,
  image,
  description,
  offerings,
  pricing,
  link,
  showStudies = false,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={image} title={title} />
      <CardContent className={classes.cardContent}>
        <ServiceCardHeader
          title={title}
          description={description}
          offerings={offerings}
          pricing={pricing}
          link={link}
        />
        {showStudies ? <CaseStudies caseStudies={caseStudiesData} /> : null}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
