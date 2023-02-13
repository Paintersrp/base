import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, CardMedia, Chip, Grid, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: 0,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    transition: "0.1s",
    [`&:first-of-type`]: {
      borderTop: "1px solid black",
    },
    "&:hover": {
      borderBottom: `3px solid ${theme.palette.secondary.main}`,
    },
  },
  textColor: {
    color: theme.palette.text.dark,
  },
  author: {
    fontSize: "0.7rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
    color: theme.palette.text.dark,
  },
  authorContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
  },
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
  boxContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  media: {
    height: "100%",
  },
}));

const ArticleListItem = ({ article }) => {
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <Link to={`/articles/${article.id}`}>
        <Grid container flex spacing={0}>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              alt="The house from the offer."
              src={`${article.image}`}
              className={classes.media}
            />
          </Grid>
          <Grid item xs={10}>
            <ListItem key={article.id}>
              <ListItemText
                primary={
                  <>
                    <Typography variant="h3" className={classes.textColor}>
                      {article.title}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          article.content.substr(0, 250) + "..."
                        ),
                      }}
                      className={classes.textColor}
                      variant="body2"
                    />
                    <div className={classes.boxContainer}>
                      <div className={classes.chipContainer}>
                        {article.tags.map((tag) => (
                          <Chip
                            key={tag.name}
                            label={tag.name}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                      <div className={classes.authorContainer}>
                        <Typography className={classes.author}>
                          By: {article.author}
                        </Typography>
                      </div>
                    </div>
                  </>
                }
              />
            </ListItem>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
};

export default ArticleListItem;
