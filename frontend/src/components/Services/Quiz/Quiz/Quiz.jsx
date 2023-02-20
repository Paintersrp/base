import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { quizStyles } from "../styles";
import Questionaire from "../Questionaire/Questionaire";
import ResultsDisplay from "../ResultsDisplay/ResultsDisplay";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const Quiz = () => {
  const classes = quizStyles();
  const [services, setServices] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState(null);
  const [unrecommendedServices, setUnrecommendedServices] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/pricing_plans/")
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
        {!recommendedServices ? (
          <>
            <Questionaire
              services={services}
              setRecommendedServices={setRecommendedServices}
              setUnrecommendedServices={setUnrecommendedServices}
            />
          </>
        ) : null}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {recommendedServices ? (
            <ResultsDisplay
              services={services}
              setServices={setServices}
              setUnrecommendedServices={setUnrecommendedServices}
              setRecommendedServices={setRecommendedServices}
              recommendedServices={recommendedServices}
              unrecommendedServices={unrecommendedServices}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Quiz;
