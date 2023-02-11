import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Box, ListItem, ListItemText } from "@material-ui/core";
import DOMPurify from "dompurify";

const useStyles = makeStyles((theme) => ({
  card: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 345,
    minWidth: 345,
    padding: 10,
    margin: 10,
    boxShadow: theme.shadows[4],
    borderRadius: 14,
    backgroundColor: theme.palette.background.light,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
    },
  },
  media: {
    height: 160,
    margin: "10px 20px 10px 20px",
    backgroundColor: theme.palette.background.light,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.light,
    padding: 0,
    color: theme.palette.text.dark,
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    width: "100%",
    backgroundColor: theme.palette.background.light,
  },
  readMoreButton: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2px",
    color: theme.palette.text.light,
    backgroundColor: theme.palette.primary.main,
    marginRight: 10,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  btnText: {
    padding: 0,
    margin: 0,
    fontSize: "14px",
  },
  body: {
    color: theme.palette.text.dark,
  },
  author: {
    fontSize: "0.7rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
    color: "white",
  },
  tag: {
    display: "inline-block",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(0.75),
    borderRadius: theme.shape.borderRadius,
    fontSize: ".75rem",
  },
}));

export default function ArticleCard({ article }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.cardContent}>
        <CardMedia
          className={classes.media}
          image={`http://localhost:8000/${article.image}`}
          title={article.title}
        />
        <ListItem key={article.id}>
          <ListItemText
            primary={
              <>
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                  }}
                >
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
                  className={classes.body}
                  variant="body2"
                />
                <Box mt={2}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    {article.tags.map((tag) => (
                      <span key={tag.id} className={classes.tag}>
                        {tag.name}
                      </span>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                      }}
                    >
                      <Typography className={classes.author}>
                        By: {article.author}
                      </Typography>
                    </div>
                  </div>
                </Box>
              </>
            }
          />
        </ListItem>
      </CardContent>
      <div className={classes.cardActions}>
        <Button
          variant="contained"
          size="small"
          justifyContent="center"
          component={Link}
          to={`/articles/${article.id}`}
          className={classes.readMoreButton}
        >
          <h4 className={classes.btnText}>More</h4>
        </Button>
      </div>
    </Card>
  );
}
