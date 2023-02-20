import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import benefitsData from "./benefitsData";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Benefit from "./Benefit";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(8, 0),
  },
  gridItem: {
    display: "flex",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
  benefitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "100%",
  },
}));

const Benefits = () => {
  const classes = useStyles();
  const [benefits, setBenefits] = useState([]);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
  const maxHeightRef = useRef(null);

  useEffect(() => {
    const maxHeight = maxHeightRef.current.offsetHeight;
    setMaxDescriptionHeight(maxHeight);
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/benefits/")
      .then((response) => {
        setBenefits(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Why Choose Us?
        </Typography>
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            We believe that our commitment to quality and customer satisfaction
            sets us apart from our competitors. Here are a few of the benefits
            of working with us
          </Typography>
        </Container>
        <div className={classes.benefitContainer}>
          <Grid container>
            {benefits.map((benefit, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                className={classes.gridItem}
                key={benefit.title}
              >
                <Benefit benefit={benefit} maxHeight={maxDescriptionHeight} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ visibility: "hidden" }} ref={maxHeightRef}>
          {benefitsData
            .reduce((max, { description }) => {
              return description.length > max.length ? description : max;
            }, "")
            .split(" ")
            .map((word) => (
              <span>{word} </span>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
