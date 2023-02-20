import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../Utils";
import FormField from "../../Elements/Fields/FormField";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import ImageEdit from "../../Elements/Fields/ImageEdit";
import ImageInput from "../../Elements/Fields/ImageInput";
import StyledButton from "../../Elements/Buttons/StyledButton";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "75%",
  },
  image: {
    minHeight: 100,
    minWidth: 200,
    width: "100%",
    paddingBottom: "56.25%",
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const AboutHeadingEdit = ({ aboutBlock, onUpdate, handleCancel }) => {
  const classes = useStyles();
  const [headData, setHeadData] = useState(aboutBlock);
  const [title, setTitle] = useState(headData.title);
  const [image, setImage] = useState(headData.image);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);

    if (image.name) {
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
        `http://localhost:8000/api/aboutblock/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/aboutblock/`);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${classes.root} ${classes.fadeIn}`}
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography
            variant="h5"
            color="black"
            style={{ textAlign: "center" }}
          >
            About Block Change
          </Typography>
          <FormField
            key="title"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <CardContent>
            {aboutBlock.image && (
              <>
                <Grid
                  container
                  flex
                  justifyContent="center"
                  style={{ marginTop: 16, padding: 8 }}
                >
                  {!newImage && aboutBlock.image && (
                    <ImageEdit
                      header="Current Image"
                      image={`${aboutBlock.image}/`}
                      xs={12}
                    />
                  )}
                  {newImage ? (
                    <>
                      <ImageEdit
                        header="Current Image"
                        image={`${aboutBlock.image}/`}
                      />
                      <ImageEdit header="New Image" image={`${newImage}`} />
                    </>
                  ) : null}
                </Grid>
                <ImageInput
                  handleChange={handleImageChange}
                  handleClick={handleClick}
                  newImage={newImage}
                  newImageName={newImageName}
                />
              </>
            )}
          </CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledButton
              type="submit"
              buttonText="Update"
              minWidth="0"
              size="small"
            />
            <StyledButton
              buttonText="Cancel"
              onClick={handleCancel}
              minWidth="0"
              size="small"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AboutHeadingEdit;
