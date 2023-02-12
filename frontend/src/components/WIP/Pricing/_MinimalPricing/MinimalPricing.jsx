import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { FaHandHoldingUsd, FaUsers, FaIndustry } from "react-icons/fa";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: 1280,
  },
  pricingCard: {
    borderRadius: theme.spacing(2),
    zIndex: 2,
    minWidth: 360,
    maxWidth: 360,
    minHeight: 360,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&.highlight": {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  pricingTitle: {
    fontWeight: "bold",
    fontSize: "1.75rem",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    fontFamily: "Poppins",
  },
  pricingPrice: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontFamily: "Roboto",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  pricingButton: {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
  icon: {
    textAlign: "center",
    fontSize: "3rem",
    marginBottom: theme.spacing(0),
  },
  chip: {
    margin: 5,
    width: "35%",
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
    fontFamily: "Poppins",
    fontWeight: 600,
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  badge: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PricingCard = ({ title, price, features, popular, icon }) => {
  const classes = useStyles();
  return (
    <Card className={`${classes.pricingCard} ${popular ? "highlight" : ""}`}>
      <CardContent>
        <div className={classes.icon}>{icon}</div>
        <Typography variant="h3" className={classes.pricingTitle}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.pricingPrice}>
          ${price}/month
        </Typography>
        <div className={classes.chipContainer}>
          {features.map((feature) => (
            <Chip key={feature} label={feature} className={classes.chip} />
          ))}
        </div>
        <div className={classes.btnContainer}>
          <Button variant="contained" className={classes.pricingButton}>
            Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PricingTier = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={4} className={classes.gridContainer}>
          <PricingCard
            title="Basic"
            price={10}
            features={["Feature 1", "Feature 2", "Feature 3"]}
            popular={false}
            icon={<FaHandHoldingUsd />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.gridContainer}>
          <PricingCard
            title="Professional"
            price={20}
            features={["Feature 1", "Feature 2", "Feature 3"]}
            popular={true}
            icon={<FaUsers />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.gridContainer}>
          <PricingCard
            title="Enterprise"
            price={30}
            features={["Feature 1", "Feature 2", "Feature 3"]}
            popular={false}
            icon={<FaIndustry />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PricingTier;
