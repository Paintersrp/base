import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { Button } from "@material-ui/core";
import BaseContent from "../../Elements/Base/BaseContent";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    backgroundColor: "#FAFAFA",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
    borderRadius: 16,
  },
  question: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  response: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  count: {
    width: "40%",
    textAlign: "right",
    paddingRight: theme.spacing(1),
  },
  bar: {
    width: "60%",
    height: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[300],
  },
  barFill: {
    height: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
  },
  exportButton: {
    marginTop: theme.spacing(2),
  },
});

const SurveyAnalysis = ({ classes, data }) => {
  console.log("test", data);
  // const [data, setData] = useState();
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSortClick = () => {
    if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
  };

  const sortResponses = (responses) => {
    const sortedResponses = Object.entries(responses).sort((a, b) => {
      const aPercentage = a[1]["percent"];
      const bPercentage = b[1]["percent"];

      if (sortOrder === "desc") {
        return bPercentage - aPercentage;
      } else {
        return aPercentage - bPercentage;
      }
    });

    return sortedResponses;
  };

  // useEffect(() => {
  //   axiosInstance
  //     .get(`/questionnaires/2/results/`)
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <BaseContent pt={0} pb={4} boxShadow={0}>
      <Paper className={classes.root}>
        {data && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              {data.questionnaire_name}
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {data.num_responses} responses
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.exportButton}
              onClick={handleSortClick}
            >
              Sort Data
            </Button>
            {data &&
              Object.entries(data.question_analysis).map(
                ([question, responses]) => (
                  <React.Fragment key={question}>
                    <Typography
                      variant="h6"
                      component="h3"
                      className={classes.question}
                    >
                      {question}
                    </Typography>
                    {sortResponses(responses).map(([option, stats]) => (
                      <div key={option} className={classes.response}>
                        <div className={classes.count}>{option}</div>
                        <div className={classes.bar}>
                          <div
                            className={classes.barFill}
                            style={{ width: `${stats["percent"]}%` }}
                          />
                        </div>
                        <div
                          className={classes.count}
                        >{`${stats["percent"]}% (${stats.count})`}</div>
                      </div>
                    ))}
                    <Divider />
                  </React.Fragment>
                )
              )}
          </>
        )}
      </Paper>
    </BaseContent>
  );
};

export default withStyles(styles)(SurveyAnalysis);
