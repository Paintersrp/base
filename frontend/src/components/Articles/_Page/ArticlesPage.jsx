import React, { useState, useEffect } from "react";
import ArticlesList from "../Display/List/ArticlesList";
import PageContainer from "../../Elements/Layout/PageContainer";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";
import { useNavigate } from "react-router-dom";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import { useSelector } from "react-redux";
import Loading from "../../Elements/Layout/Loading/Loading";

const ArticlesPage = ({ handleUpdate }) => {
  const [error, setError] = useState();
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [ready, setReady] = useState(false);

  const handleCreate = () => {
    navigate(`/articles/create`);
  };

  useEffect(() => {
    setReady(false);
    axiosInstance
      .get("/articles/")
      .then((response) => {
        setArticles(response.data);
        setReady(true);
      })
      .catch((err) => {
        setError(err);
      });
    axiosInstance
      .get("/tags/")
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer backgroundColor="#F5F5F5" page_name="News">
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      <ArticlesList
        tags={tags}
        articles={articles}
        handleCreate={handleCreate}
        auth={auth}
      />
    </PageContainer>
  );
};

export default ArticlesPage;
