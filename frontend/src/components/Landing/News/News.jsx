import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArticleCard from "./ArticleCard";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock";
import { Paper } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useSelector } from "react-redux";
import TitleBlockEditor from "../../Elements/TextBlocks/TitleBlockEditor";
import EditButton from "../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.light,
    color: "#fafafa",
    paddingBottom: 40,
    [theme.breakpoints.down("1100")]: {
      flexDirection: "column",
    },
  },
  cardroot: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 345,
    minWidth: 345,
    margin: 10,
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {},
  },
  cardContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.light,
    padding: 10,
    color: "#fafafa",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: theme.palette.background.light,
    maxWidth: 1400,
  },
}));

export default function LatestNews() {
  const [articlesData, setArticlesData] = useState([]);
  const [titleBlock, setTitleBlock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateTitleBlock = (updateTitleBlock) => {
    setTitleBlock(updateTitleBlock);
    setEditing(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/titleblock/news/")
      .then((response) => {
        setTitleBlock(response.data);
      })
      .catch((err) => {
        setError(err);
      });

    axiosInstance
      .get("/articles/recent/")
      .then((response) => {
        setArticlesData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[0, 1, 2].map((article) => (
          <Grid item key={article} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <h5>Loading</h5>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        An error occurred while loading the articles.
      </Typography>
    );
  }

  return (
    <Grid container spacing={0} className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid item xs={12}>
          {auth.is_superuser ? (
            <div style={{ marginTop: 20 }}>
              <EditButton
                onClick={() => setEditing(!editing)}
                editState={editing}
              />
            </div>
          ) : null}
          {!editing ? (
            <TitleBlock
              subtitle={titleBlock.subtitle}
              title={titleBlock.title}
              alignment={titleBlock.alignment}
              showDivider={titleBlock.show_divider}
            />
          ) : (
            <TitleBlockEditor
              titleBlock={titleBlock}
              onUpdate={updateTitleBlock}
            />
          )}
        </Grid>
        <Grid container spacing={2}>
          {articlesData.map((article) => (
            <Grid
              item
              key={article.id}
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className={classes.cardroot}
            >
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}
