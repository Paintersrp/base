import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CardMedia,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import QuillEditor from "../Create/TextEditor";
import TagsInput from "../Create/TagsInput";
import FormField from "../../Elements/Fields/FormField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { baseClasses } from "../../../classes";
import StyledButton from "../../Elements/Buttons/StyledButton";
import PostSidebar from "../Display/List/PostSidebar";
import ManyToManyField from "../../Elements/Fields/ManyToManyField";
import ImageEdit from "../../Elements/Fields/ImageEdit";
import ImageInput from "../../Elements/Fields/ImageInput";
import { useDispatch } from "react-redux";

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
    padding: "0px 0 80px 0",
    backgroundColor: theme.palette.background.light,
  },
  card: {
    maxWidth: 700,
    backgroundColor: theme.palette.background.light,
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
  sidebarContainer: {
    position: "sticky",
    top: 0,
  },
  gridContainer: {
    maxWidth: 920,
    backgroundColor: theme.palette.background.light,
    paddingTop: theme.spacing(0),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const UpdateArticleView = ({ article, updateArticle, handleCancel }) => {
  const { id } = useParams();
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const dispatch = useDispatch();
  const [content, setContent] = useState(article.content);
  const [formData, setFormData] = useState(article);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageChange = (event) => {
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
    setNewImageFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleManyToManyChange = (fieldName, fieldValue) => {
    const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
    newFeatures.push({ detail: fieldValue });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newFeatures,
    }));
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    formData.image = newImageFile;
    formData.content = content;

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/articles/${id}/`,
        formData,
        config
      );
      setFormData(response.data);
      updateArticle(response.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  const handleComponentsChange = (fieldName, newObjects) => {
    formData[fieldName] = newObjects;
    console.log("formData", formData);
  };

  return (
    <div className={`${classes.root} ${fadeIn}`}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        className={classes.gridContainer}
      >
        <Paper className={classes.card} elevation={0}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              {formData.image && (
                <>
                  <Grid
                    container
                    flex
                    justifyContent="center"
                    style={{ padding: 8, width: "100%" }}
                  >
                    {formData.image && (
                      <ImageEdit
                        header="Current Thumbnail"
                        image={`${formData.image}`}
                      />
                    )}
                    {newImage ? (
                      <ImageEdit header="New Thumbnail" image={`${newImage}`} />
                    ) : null}
                  </Grid>
                  <ImageInput
                    handleChange={handleImageChange}
                    handleClick={handleClick}
                    newImage={newImage}
                    newImageName={newImageName}
                    width="50%"
                  />
                </>
              )}
              <div style={{ width: "100%", marginBottom: 15 }}>
                <Typography className={classes.helpText}>
                  Set Post Title
                </Typography>
                <FormField
                  id="title"
                  key="title"
                  // label="Set Post Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  variant="standard"
                />
              </div>
              <div>
                <ManyToManyField
                  data={formData.tags}
                  handleManyToManyChange={handleManyToManyChange}
                  handleComponentsChange={handleComponentsChange}
                  fieldName="tags"
                  verboseName="Category Tags"
                  setFormData={setFormData}
                  variant="standard"
                  helpText
                />
              </div>

              <QuillEditor value={content} onChange={handleContentChange} />

              {/* <div>
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
              </div> */}
            </CardContent>

            <CardActions
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <StyledButton
                buttonText="Cancel"
                onClick={handleCancel}
                minWidth="0"
                size="small"
              />

              <StyledButton
                type="submit"
                buttonText="Update"
                minWidth="0"
                size="small"
              />
            </CardActions>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default UpdateArticleView;
