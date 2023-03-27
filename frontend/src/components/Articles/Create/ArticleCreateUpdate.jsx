import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "./TextEditor";
import { Typography } from "@material-ui/core";
import PageContainer from "../../Elements/Layout/PageContainer";
import BaseContent from "../../Elements/Base/BaseContent";
import { getCookie } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      marginBottom: 5,
      marginTop: 5,
      width: "25ch",
    },
  },
  title: {
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "50%",
    height: 200,
    marginTop: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CreateUpdateArticle = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const classes = useStyles();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags.join(","));
    if (image) {
      formData.append("image", image, image.name);
    }

    console.log(formData);

    axios
      .post("http://localhost:8000/api/articles/", formData, config)
      .then((res) => {
        setTitle("");
        setContent("");
        setTags([]);
        setImage(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <PageContainer backgroundColor="#F5F5F5" page_name="News">
      <BaseContent
        maxWidth={1000}
        pt={4}
        pb={4}
        boxShadow={1}
        header={
          <Typography variant="h3" component="h1" className={classes.title}>
            Create Article
          </Typography>
        }
      >
        <div style={{ width: "100%", display: "flex" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              label="Post Title"
              value={title}
              onChange={handleTitleChange}
              variant="outlined"
            />
            <div>
              <QuillEditor value={content} onChange={handleContentChange} />
            </div>
            <TextField
              label="Tags"
              value={tags.join(", ")}
              onChange={handleTagsChange}
              variant="outlined"
            />
            <div>
              <input
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => fileInputRef.current.click()}
              >
                Choose Thumbnail
              </Button>
              {image && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={classes.imageContainer}>
                    <img
                      className={classes.image}
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className={classes.buttonContainer}>
          <Button onClick={handleSubmit} color="primary">
            Publish
          </Button>
        </div>
      </BaseContent>
    </PageContainer>
  );
};

export default CreateUpdateArticle;
