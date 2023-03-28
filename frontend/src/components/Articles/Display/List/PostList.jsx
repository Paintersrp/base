import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DOMPurify from "dompurify";
import { Divider, useMediaQuery } from "@material-ui/core";
import ArticleInfoBar from "../../InfoBar";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    maxWidth: 800,
    borderRight: `1px solid rgba(0, 0, 0, 0.03)`,
    [theme.breakpoints.down("md")]: {
      order: 2,
    },
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 0),
  },
  thumbnail: {
    minWidth: 200,
    maxWidth: 300,
    marginLeft: 16,
    marginTop: 16,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 175,
      minWidth: 175,
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 125,
      minWidth: 125,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    borderRadius: 8,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(0, 0, 0, 0),
    paddingBottom: "0px !important",
  },
  title: {
    color: theme.palette.text.dark,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },
  subtitle: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.825rem",
    },
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.text.dark,
    marginBottom: theme.spacing(0),
    textAlign: "left",
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  dividerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "24px 24px 24px 24px",
  },
}));

const PostList = ({ posts, title = "Latest News" }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      {title && (
        <div className={classes.header}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className={classes.heading}
          >
            {title}
          </Typography>
          <div className={classes.dividerContainer}>
            <div style={{ width: "100%" }}>
              <Divider />
            </div>
          </div>
        </div>
      )}
      <Grid container spacing={2}>
        {posts.map((post) => {
          const html = DOMPurify.sanitize(post.content);
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

          headings.forEach((heading) => {
            heading.outerHTML = "";
          });

          const modifiedHtml = doc.body.innerHTML;
          const text = parser.parseFromString(modifiedHtml, "text/html").body
            .textContent;
          const truncatedText = text.substr(0, 200) + "...";
          return (
            <>
              <Grid item xs={12} key={post.id}>
                <Card className={classes.card} elevation={0}>
                  <CardContent className={classes.content}>
                    <ArticleInfoBar article={post} size="small" />
                    <Link to={`/articles/${post.id}`}>
                      <Typography
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {post.title}
                      </Typography>

                      {!isSmallScreen && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={classes.subtitle}
                        >
                          {truncatedText}
                        </Typography>
                      )}
                    </Link>
                  </CardContent>
                  <Link to={`/articles/${post.id}`}>
                    <div className={classes.thumbnail}>
                      <CardMedia
                        className={classes.media}
                        image={post.image}
                        title={post.title}
                      />
                    </div>
                  </Link>
                </Card>
              </Grid>

              <div className={classes.dividerContainer}>
                <div style={{ width: "100%" }}>
                  <Divider />
                </div>
              </div>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default PostList;
