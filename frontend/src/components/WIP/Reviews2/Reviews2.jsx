import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  reviewContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  reviewDate: {
    color: theme.palette.text.secondary,
  },
  reviewRating: {
    marginBottom: theme.spacing(2),
  },
  reviewDivider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  reviewText: {
    color: theme.palette.text.secondary,
  },
  reviewPaper: {
    padding: theme.spacing(2),
    borderRadius: 16,
  },
  reviewGrid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "center",
    "& > *": {
      flexBasis: "100%",
    },
  },
}));

const reviews = [
  {
    name: "John Doe",
    rating: 4,
    review: "Great service! Would highly recommend.",
    avatar: "https://i.pravatar.cc/150?img=67",
    platform: "Google Reviews",
    date: "July 12, 2022",
  },
  {
    name: "Jane Smith",
    rating: 5,
    review: "The best service I have ever used!",
    avatar: "https://i.pravatar.cc/150?img=42",
    platform: "Facebook",
    date: "June 23, 2022",
  },
  {
    name: "Bob Johnson",
    rating: 3,
    review: "Service was good, but could have been better.",
    avatar: "https://i.pravatar.cc/150?img=69",
    platform: "Yelp",
    date: "May 5, 2022",
  },
];

const ReviewSection = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        What Our Customers Are Saying
      </Typography>
      <Grid container spacing={2} className={classes.reviewGrid}>
        {reviews.map((review, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} className={classes.reviewPaper}>
              <Box>
                <Box className={classes.reviewContainer}>
                  <Avatar
                    alt={review.name}
                    src={review.avatar}
                    className={classes.avatar}
                  />
                  <Box>
                    <Typography variant="subtitle1">{review.name}</Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.reviewDate}
                    >
                      {review.platform} - {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.reviewRating}>
                  <Rating
                    name={`rating-${index}`}
                    value={review.rating}
                    readOnly
                  />
                </Box>
                <Divider variant="middle" className={classes.reviewDivider} />
                <Typography variant="body1" className={classes.reviewText}>
                  {review.review}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewSection;
