import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import BlogPostsControl from "./BlogPostsControl";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem",
    width: "100%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.5rem",
    boxShadow: theme.shadows[2],
    transition: "box-shadow 0.2s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  },
  cardActionArea: {
    flexGrow: 1,
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const BlogPosts = ({ blogPosts }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setCategoryFilters([...categoryFilters, category]);
    } else {
      setCategoryFilters(categoryFilters.filter((c) => c !== category));
    }
  };

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilters.length === 0 || categoryFilters.includes(post.category))
  );

  return (
    <div className={classes.root}>
      <BlogPostsControl
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        categoryFilters={categoryFilters}
        handleCategoryChange={handleCategoryChange}
      />
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={post.id}>
            <Card className={classes.card}>
              <CardActionArea component="a" href={`/blog/${post.id}`}>
                <CardMedia
                  className={classes.cardMedia}
                  image={post.image}
                  title={post.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogPosts;
