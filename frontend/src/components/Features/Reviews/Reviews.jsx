import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReviewCard from "./ReviewCard";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock";

const reviews = [
  {
    rating: 4.3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit.",
    avatar: "https://example.com/customer-avatar.jpg",
    name: "John Doe",
  },
  {
    rating: 3.7,
    text: "Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam.",
    avatar: "https://example.com/customer-avatar2.jpg",
    name: "Jane Smith",
  },
  {
    rating: 2.4,
    text: "Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam.",
    avatar: "https://example.com/customer-avatar2.jpg",
    name: "DJ Khalid",
  },
  // more reviews...
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    backgroundColor: "#242424",
    color: "white",
    padding: theme.spacing(3),
    maxWidth: 1400,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Reviews = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={9}>
          <TitleBlock
            subtitle="What Our Customers Are Saying"
            title="Customer Reviews"
            alignment="Left"
          />
          <Grid container spacing={3}>
            {reviews.map((review, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                justifyContent="center"
                style={{ display: "flex" }}
              >
                <ReviewCard review={review} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Reviews;
