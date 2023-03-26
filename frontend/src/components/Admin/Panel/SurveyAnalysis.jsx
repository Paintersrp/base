import React, { useMemo, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import BaseContent from "../../Elements/Base/BaseContent";
import SortIcon from "@mui/icons-material/Sort";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    backgroundColor: theme.palette.background.default,
    borderRadius: 16,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
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
    marginTop: theme.spacing(0),
  },
});

const SurveyAnalysis = ({ classes, data }) => {
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

  return (
    <BaseContent pt={0} pb={4} pad={0} boxShadow={0} background="inherit">
      <Paper className={classes.root} elevation={0}>
        {data && (
          <>
            <Button
              variant="contained"
              color="primary"
              className={classes.exportButton}
              onClick={handleSortClick}
            >
              <SortIcon style={{ marginRight: 4 }} /> Sort {sortOrder}
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
