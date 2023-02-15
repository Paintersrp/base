import StarRatings from "react-star-ratings";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  papercard: {
    backgroundColor: "#1B1B1B",
    marginTop: 20,
    maxWidth: 370,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  avatar: {
    color: "white",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  customerName: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 25,
    width: "100%",
  },
}));

const ReviewCard = ({ review }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.papercard} elevation={6}>
      <StarRatings
        name="rating"
        rating={review.rating}
        starRatedColor="gold"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="5px"
      />
      <div style={{ minHeight: 85 }}>
        <Typography variant="body1" style={{ color: "white" }}>
          "{review.text}"
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Avatar className={classes.avatar} src={review.avatar} />
        <Typography variant="body2" className={classes.customerName}>
          {review.name}
        </Typography>
      </div>
    </Paper>
  );
};

export default ReviewCard;
