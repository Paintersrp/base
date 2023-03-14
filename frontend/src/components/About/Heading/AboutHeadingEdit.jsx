import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../Utils";
import FormField from "../../Elements/Fields/FormField";
import ImageEdit from "../../Elements/Fields/ImageEdit";
import ImageInput from "../../Elements/Fields/ImageInput";
import UpdateCancelButtonMenu from "../../Elements/Buttons/UpdateCancelButtonMenu";
import axiosInstance from "../../../lib/Axios/axiosInstance";

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
    width: "90%",
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
  const [title, setTitle] = useState(aboutBlock.title);
  const [image, setImage] = useState(aboutBlock.image);
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
      await axiosInstance
        .patch(`/aboutblock/1/`, formData, config)
        .then((res) => {
          onUpdate(res.data);
        });
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
          <UpdateCancelButtonMenu
            handleCancel={handleCancel}
            placement="bottom"
          />
          <Typography
            variant="h5"
            style={{ textAlign: "center", color: "black" }}
          >
            About Block Edit
          </Typography>
          <FormField
            key="title"
            label="Company Title"
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
        </div>
      </div>
    </form>
  );
};

export default AboutHeadingEdit;
