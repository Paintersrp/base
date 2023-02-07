import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import QuillEditor from "./TextEditor";
import TagsInput from "./TagsInput";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "99vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: "20px 0 20px 0",
  },
  card: {
    maxWidth: "90%",
    backgroundColor: "#1C1C1C",
    color: "white",
  },
  title: {
    padding: 20,
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
  },
  body: {
    padding: "0 40px 0 40px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "0.9rem",
    letterSpacing: 0.5,
    lineHeight: 1.5,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    minHeight: 200,
    width: "100%",
    paddingBottom: "56.25%",
  },
  chips: {
    padding: 15,
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const UpdateArticleView = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [article, setArticle] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/articles/${id}/`
        );
        setArticle(res.data);
        setContent(res.data.content);
        setTitle(res.data.title);
        setTags(res.data.tags.map((tag) => tag.name.trim()));
        setImage(res.data.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags.join(","));
    if (image) {
      formData.append("image", image, image.name);
    }
    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/articles/${id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/articles/${id}/`);
      setArticle(res.data);
      setContent(res.data.content);
      setTitle(res.data.title);
      setTags(res.data.tags.map((tag) => tag.name.trim()));
      setImage(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {article.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <CardMedia
                    className={classes.image}
                    image={`${article.image}`}
                  />
                </div>
              </div>
            )}
            <Typography className={classes.title}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Typography>
            <QuillEditor value={content} onChange={handleContentChange} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </CardContent>
          <CardActions className={classes.chips}>
            <TagsInput tags={tags} setTags={setTags} />
          </CardActions>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Update
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default UpdateArticleView;
