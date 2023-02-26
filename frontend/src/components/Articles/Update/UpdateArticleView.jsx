import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CardMedia, InputAdornment, TextField } from "@material-ui/core";
import QuillEditor from "../Create/TextEditor";
import TagsInput from "../Create/TagsInput";
import FormField from "../../Elements/Fields/FormField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { baseClasses } from "../../../classes";
import StyledButton from "../../Elements/Buttons/StyledButton";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: "20px 0 20px 0",
  },
  card: {
    maxWidth: 1200,
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.dark,
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
    minHeight: 400,
    width: "100%",
    paddingBottom: "56.25%",
    borderRadius: 8,
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
  },
  input: {
    display: "none",
  },
}));

const UpdateArticleView = ({ manualId }) => {
  const { id } = useParams();
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const [article, setArticle] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
        if (manualId) {
          res = await axios.get(
            `http://localhost:8000/api/articles/${manualId}/`
          );
          console.log("test: ", res);
        } else {
          res = await axios.get(`http://localhost:8000/api/articles/${id}/`);
        }
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
      formData.append("image", image);
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
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className={`${classes.root} ${fadeIn}`}>
      <Paper className={classes.card} elevation={0}>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "50%", marginRight: 15, marginTop: 15 }}>
                <FormField
                  key="title"
                  label="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
            </div>
            <QuillEditor value={content} onChange={handleContentChange} />
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="file-input"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <TextField
                id="file-textfield"
                label="Upload Article Thumbnail"
                variant="outlined"
                disabled
                value={image ? image.name : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </CardContent>
          <CardActions className={classes.chips}>
            <TagsInput tags={tags} setTags={setTags} />
          </CardActions>
          <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
            <StyledButton
              type="submit"
              buttonText="Update"
              minWidth="0"
              size="small"
            />
          </CardActions>
        </form>
      </Paper>
    </div>
  );
};

export default UpdateArticleView;
