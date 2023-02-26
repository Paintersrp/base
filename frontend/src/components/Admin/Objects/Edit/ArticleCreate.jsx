import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "../../../Articles/Create/TextEditor";
import { Grid, Typography } from "@material-ui/core";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: 5,
      marginTop: 5,
      width: "25ch",
    },
  },
  dialog: {
    minWidth: "75%",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontFamily: "Poppins",
    fontWeight: 700,
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

const ArticleCreate = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const classes = useStyles();
  const fileInputRef = useRef();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleClickClose = () => {
    setOpen(false);
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
    <>
      <Typography className={classes.title}>Create Article</Typography>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            label="Title"
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
              onClick={() => fileInputRef.current.click()}
            >
              Choose Image
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
      </DialogContent>
      <Grid container justifyContent="center">
        <Button onClick={handleClickClose} color="primary">
          Cancel
        </Button>

        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </Grid>
    </>
  );
};

export default ArticleCreate;
