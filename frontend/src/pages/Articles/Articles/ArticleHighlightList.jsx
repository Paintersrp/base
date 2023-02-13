import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import DOMPurify from "dompurify";
import BaseCard from "../../../components/Elements/Base/BaseCard";
import ArticleHighlightActions from "./ArticleHighlightActions";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: "white",
  },
  listContainer: {
    padding: 20,
  },
}));

const ArticleHighlightList = ({ articles }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <Grid
        container
        spacing={0}
        flex
        justifyContent="center"
        className={classes.listContainer}
      >
        {articles.map((article) => (
          <Grid item style={{ padding: 10 }}>
            <BaseCard
              title={article.title}
              subtitle="Subtitle"
              headerAction={[]}
              headerTitleProps="h5"
              headerSubheaderProps="body2"
              media={`http://localhost:8000/${article.image}`}
              mediaPosition="left"
              actions={<ArticleHighlightActions article={article} />}
            >
              <Typography variant="body2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      article.content.substr(0, 250) + "..."
                    ),
                  }}
                />
              </Typography>
            </BaseCard>
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default ArticleHighlightList;
