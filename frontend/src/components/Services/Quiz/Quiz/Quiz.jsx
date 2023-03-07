import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { quizStyles } from "../styles";
import Questionaire from "../Questionaire/Questionaire";
import ResultsDisplay from "../ResultsDisplay/ResultsDisplay";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ServiceComparison from "../../Individual/_ServiceCompare";
import ComparisonTable from "../TablesDisplay/ComparisonTable";

const Quiz = () => {
  const classes = quizStyles();
  const [services, setServices] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState(null);
  const [unrecommendedServices, setUnrecommendedServices] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/servicetier/")
      .then((response) => {
        console.log("Response");
        console.log(response.data);
        setServices(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${classes.root}`}>
      <Grid container flex justifyContent="center">
        {!recommendedServices && (
          <Paper
            elevation={0}
            style={{
              width: 1400,
              background: "#F5F5F5",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Questionaire
                services={services}
                setRecommendedServices={setRecommendedServices}
                setUnrecommendedServices={setUnrecommendedServices}
              />
            </div>
            <ComparisonTable />
          </Paper>
        )}
        {recommendedServices && (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
              background: "#F5F5F5",
            }}
          >
            <ResultsDisplay
              services={services}
              setServices={setServices}
              setUnrecommendedServices={setUnrecommendedServices}
              setRecommendedServices={setRecommendedServices}
              recommendedServices={recommendedServices}
              unrecommendedServices={unrecommendedServices}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Quiz;
