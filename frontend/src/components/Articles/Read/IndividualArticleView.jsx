import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import "./quillStyles.css";
import EditButton from "../../Elements/Buttons/EditButton";
import UpdateArticleView from "../Update/UpdateArticleView";
import { baseClasses } from "../../../classes";
import PageContainer from "../../Elements/Layout/PageContainer";
import BaseContent from "../../Elements/Base/BaseContent";
import ArticleInfoBar from "../InfoBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "99vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.light,
    flexDirection: "column",
  },
  card: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
  },
  title: {
    fontFamily: "Roboto",
    color: "black",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1, 0, 1, 0),
  },
  body: {
    fontFamily: "Roboto",
    fontWeight: "400 !important",
    fontSize: "0.95rem",
    letterSpacing: 0.25,
    lineHeight: 1.5,
    "& img": {
      width: "100%",
      borderRadius: 8,
    },
    "& .ql-align-right": {
      textAlign: "right",
    },
    "& .ql-align-left": {
      textAlign: "left",
    },
    "& .ql-align-center": {
      textAlign: "center",
    },
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    marginBottom: theme.spacing(3),
    paddingTop: "56.25%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "40px 0",
    "& > *": {
      margin: theme.spacing(0.5),
    },
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
  editButton: {
    display: "flex",
    justifyContent: "center",
    width: "10%",
    textAlign: "center",
    margin: "0px 20px",
  },
}));

const IndividualArticleView = ({}) => {
  const { id } = useParams();
  const { fadeIn } = baseClasses();
  const [article, setArticle] = useState(null);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const editmode = useSelector((state) => state.editmode);

  useEffect(() => {
    axiosInstance
      .get(`/articles/${id}/`)
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageContainer backgroundColor="#F5F5F5" seoEdit={false}>
      {article && (
        <BaseContent
          maxWidth={1000}
          pt={0}
          pb={0}
          boxShadow={0}
          pad={0}
          justifyChildren="center"
        >
          <BaseContent maxWidth={700} pt={0} pb={0} boxShadow={0}>
            {auth.is_superuser ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <EditButton
                  onClick={() => setEditing(!editing)}
                  editState={editing}
                  position="flex-end"
                />
              </div>
            ) : null}
            {!editing && (
              <Grid
                container
                className={fadeIn}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* {article.image && (
                <Grid item xs={9}>
                  <CardMedia
                    className={classes.image}
                    image={`${article.image}`}
                  />
                </Grid>
              )} */}
                <Grid item xs={12} style={{ color: "black" }}>
                  <ArticleInfoBar article={article} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" className={classes.title}>
                    {article.title}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Paper className={classes.card} elevation={0}>
              {!editing ? (
                <>
                  {article.content ? (
                    <Typography variant="body2" className={classes.body}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(article.content),
                        }}
                        className={classes.body}
                      />
                    </Typography>
                  ) : null}
                </>
              ) : (
                <div>
                  <UpdateArticleView article={article} />
                </div>
              )}
            </Paper>
          </BaseContent>
        </BaseContent>
      )}
    </PageContainer>
  );
};

export default IndividualArticleView;
