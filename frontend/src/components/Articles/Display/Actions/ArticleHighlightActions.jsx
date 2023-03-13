import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button, Chip, Grid } from "@material-ui/core";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const useStyles = makeStyles((theme) => ({
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.light,
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
  button: {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: 48,
    transition: "0.3s",
    "&:hover": {
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.primary.main,
    },
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
          <Button
            key="2"
            size="small"
            variant="contained"
            className={classes.button}
            startIcon={<ReadMoreIcon />}
          >
            More
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ArticleHighlightActions;
