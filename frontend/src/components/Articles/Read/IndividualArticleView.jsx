import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
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
import ReadPostSidebar from "./ReadPostSidebar";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import PostList from "../Display/List/PostList";
import Loading from "../../Elements/Layout/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "99vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: theme.spacing(3, 2, 8, 2),
    backgroundColor: theme.palette.background.light,
    flexDirection: "column",
  },
  card: {
    minWidth: 700,
    maxWidth: 700,
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    marginRight: 16,
    borderRight: `1px solid rgba(0, 0, 0, 0.03)`,
    paddingRight: 16,
    paddingBottom: 128,
    paddingTop: 16,
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
  sidebarContainer: {
    position: "sticky",
    top: 0,
  },
  gridContainer: {
    maxWidth: 920,
    backgroundColor: theme.palette.background.light,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
}));

const IndividualArticleView = ({ handleUpdate }) => {
  const { id } = useParams();
  const { fadeIn } = baseClasses();
  const [article, setArticle] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingSeo, setEditingSeo] = useState(false);
  const [ready, setReady] = useState(false);
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const editmode = useSelector((state) => state.editmode);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(`/articles/create`);
  };

  const updateArticle = (updateArticle) => {
    setArticle(updateArticle);
    setEditing(false);
    setTimeout(scrollToTop, 0);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleCancel = () => {
    setEditing(!editing);
    setTimeout(scrollToTop, 0);
  };

  useEffect(() => {
    setReady(false);
    axiosInstance
      .get(`/articles/${id}/`)
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
        setReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setReady(false);
    setTimeout(scrollToTop, 250);
  }, [id]);

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer backgroundColor="#F5F5F5" seoEdit={false}>
      <FABMenu
        editing={editingSeo}
        setEditing={setEditingSeo}
        handleUpdate={handleUpdate}
      />
      {article && (
        <BaseContent
          maxWidth={1200}
          pt={0}
          pb={0}
          boxShadow={0}
          pad={0}
          justifyChildren="center"
        >
          <Grid
            container
            spacing={0}
            justifyContent="center"
            className={classes.gridContainer}
          >
            <div>
              <Paper className={classes.card} elevation={0}>
                {!editing && editmode.editMode ? (
                  <>
                    <EditDeleteButtonMenu
                      editClick={() => setEditing(!editing)}
                      hideDelete
                      position="end"
                      adminLink="articles"
                      text={`Article`}
                      obj={article.id}
                    />
                  </>
                ) : null}
                {!editing && (
                  <Grid
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
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
                      <UpdateArticleView
                        article={article}
                        updateArticle={updateArticle}
                        handleCancel={handleCancel}
                      />
                    </div>
                  )}
                </Paper>
                <PostList
                  posts={article.related_articles}
                  title="Related Articles"
                />
              </Paper>
            </div>

            <div className={classes.sidebarContainer}>
              <ReadPostSidebar
                article={article}
                tags={article.tags}
                author_details={article.author_details}
                handleCreate={handleCreate}
                auth={auth}
              />
            </div>
          </Grid>
        </BaseContent>
      )}
    </PageContainer>
  );
};

export default IndividualArticleView;
