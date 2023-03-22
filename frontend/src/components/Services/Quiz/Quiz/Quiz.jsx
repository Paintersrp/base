import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { quizStyles } from "../styles";
import Questionaire from "../Questionaire/Questionaire";
import ResultsDisplay from "../ResultsDisplay/ResultsDisplay";
import ComparisonTable from "../TablesDisplay/ComparisonTable";

const Quiz = ({
  services,
  setServices,
  servicesTableData,
  competitorsTableData,
  benefitsData,
  benefitsBlock,
  setBenefitsBlock,
  quizData,
  editMode,
}) => {
  console.log(servicesTableData, competitorsTableData, "tabledata");
  const classes = quizStyles();
  const [recommendedServices, setRecommendedServices] = useState(null);
  const [unrecommendedServices, setUnrecommendedServices] = useState([]);

  return (
    <div className={`${classes.root}`}>
      <Grid container flex justifyContent="center">
        {!recommendedServices && services && servicesTableData && (
          <Paper
            elevation={0}
            style={{
              width: "100%",
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
                quizData={quizData}
                editMode={editMode}
              />
            </div>
            <ComparisonTable
              tableData={servicesTableData}
              editMode={editMode}
            />
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
              benefitsData={benefitsData}
              benefitsBlock={benefitsBlock}
              setBenefitsBlock={setBenefitsBlock}
              servicesTableData={servicesTableData}
              competitorsTableData={competitorsTableData}
              editMode={editMode}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Quiz;
