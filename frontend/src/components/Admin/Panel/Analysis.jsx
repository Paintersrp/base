import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  chartTitle: {
    marginBottom: theme.spacing(2),
  },
  answerContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const QuestionnaireAnalysis = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {data && (
        <>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h3" align="center">
                {data.questionnaire_name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom align="center">
                Number of responses: {data.num_responses}
              </Typography>
            </Paper>
          </Grid>
          {Object.entries(data.question_analysis).map(([question, answers]) => (
            <Grid item xs={12} md={6} lg={6} xl={6} key={question}>
              <Paper className={classes.paper} style={{ marginBottom: 16 }}>
                <Typography
                  variant="h4"
                  className={classes.chartTitle}
                  gutterBottom
                >
                  {question}
                </Typography>
                <ResponsiveContainer width="100%" height={370}>
                  <PieChart>
                    <Pie
                      data={Object.entries(answers).map(
                        ([label, { count }]) => ({
                          label,
                          value: count,
                        })
                      )}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {Object.entries(answers).map(([label], index) => (
                        <Cell
                          key={label}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className={classes.answerContainer}>
                  {Object.entries(answers).map(
                    ([label, { count, percent }], index) => (
                      <Typography key={label} component="div" gutterBottom>
                        <Grid container alignItems="center">
                          <Grid item xs={2}>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: COLORS[index % COLORS.length],
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            {label}
                          </Grid>
                          <Grid item xs={4}>
                            {count} ({percent}%)
                          </Grid>
                        </Grid>
                      </Typography>
                    )
                  )}
                </div>
              </Paper>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default QuestionnaireAnalysis;
