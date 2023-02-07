import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    borderRadius: 14,
    width: "80%",
    maxWidth: "600px",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(2),
  },
  reviewer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    color: "white",
    fontWeight: 700,
    fontFamily: "Poppins",
  },
  company: {
    color: "white",
    fontWeight: 500,
    fontFamily: "Poppins",
  },
  review: {
    marginBottom: theme.spacing(2),
    fontStyle: "italic",
    color: "white",
    fontWeight: 400,
    fontFamily: "Poppins",
    fontSize: "0.9rem",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const MinimalTestimonials = (props) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = props.testimonials;

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(testimonials.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === testimonials.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card} elevation={6}>
        <div style={{ display: "flex" }}>
          <div className={classes.controls}>
            <IconButton className={classes.controlButton} onClick={handlePrev}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <CardContent>
            <div className={classes.reviewer}>
              <Avatar
                src={testimonials[currentIndex].avatar}
                alt={`${testimonials[currentIndex].name}'s avatar`}
                className={classes.avatar}
              />
              <div>
                <Typography variant="h6">
                  {testimonials[currentIndex].name}
                </Typography>
                <Typography variant="caption" className={classes.company}>
                  {testimonials[currentIndex].company}
                </Typography>
              </div>
            </div>
            <Typography variant="body1" className={classes.review}>
              "{testimonials[currentIndex].review}"
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton className={classes.controlButton} onClick={handleNext}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MinimalTestimonials;
