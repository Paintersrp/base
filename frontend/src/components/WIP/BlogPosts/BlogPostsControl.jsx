import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  search: {
    marginBottom: "1rem",
  },
  checkboxLabel: {
    fontSize: "1rem",
  },
});

const BlogPostsControl = ({
  searchQuery,
  handleSearchChange,
  categoryFilters,
  handleCategoryChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        className={classes.search}
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Typography variant="subtitle1" className={classes.search}>
        Filter by Category:
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.includes("technology")}
                onChange={handleCategoryChange}
                value="technology"
                color="primary"
              />
            }
            label={
              <Typography variant="subtitle2" className={classes.checkboxLabel}>
                Technology
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.includes("food")}
                onChange={handleCategoryChange}
                value="food"
                color="primary"
              />
            }
            label={
              <Typography variant="subtitle2" className={classes.checkboxLabel}>
                Food
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.includes("travel")}
                onChange={handleCategoryChange}
                value="travel"
                color="primary"
              />
            }
            label={
              <Typography variant="subtitle2" className={classes.checkboxLabel}>
                Travel
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFilters.includes("sports")}
                onChange={handleCategoryChange}
                value="sports"
                color="primary"
              />
            }
            label={
              <Typography variant="subtitle2" className={classes.checkboxLabel}>
                Sports
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BlogPostsControl;
