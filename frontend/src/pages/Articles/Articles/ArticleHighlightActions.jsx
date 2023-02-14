import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button, Chip, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  chipContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 5,
  },
}));

const ArticleHighlightActions = ({ article, subtitleVariant }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      flex
      spacing={0}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className={classes.chipContainer}>
        {article.tags.map((tag) => (
          <Chip key={tag.name} label={tag.name} className={classes.chip} />
        ))}
      </div>

      <Grid container flex justifyContent="space-between" alignItems="center">
        <Typography variant={subtitleVariant}>By: {article.author}</Typography>
        <Link to={`/articles/${article.id}`}>
          <Button key="2" size="small" variant="contained" color="primary">
            More
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ArticleHighlightActions;
