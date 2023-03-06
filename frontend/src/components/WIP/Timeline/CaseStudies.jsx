import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: theme.palette.background.light,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
    borderRadius: 0,
  },
  cardContent: {
    padding: `${theme.spacing(0, 1, 0, 1)} !important`,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const CaseStudies = ({ caseStudies }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {caseStudies.map((study, index) => (
        <Card className={classes.card} elevation={0}>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={{ order: index % 2 === 0 ? 2 : 1 }}
          >
            <CardMedia
              className={classes.cardMedia}
              image={study.image}
              title={study.title}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            style={{ order: index % 2 === 0 ? 1 : 2 }}
          >
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                align={index % 2 === 0 ? "left" : "right"}
              >
                {study.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                align={index % 2 === 0 ? "left" : "right"}
              >
                {study.description}
              </Typography>
              <Grid
                container
                justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"}
              >
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="small"
                  href={study.link}
                >
                  See More
                </Button>
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
};

export default CaseStudies;
