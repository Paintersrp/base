import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import Item from "../../../Elements/Layout/Item/Item";
import ImageEditMixin from "../../../Elements/Base/EditForm/ImageEditMxin";
import ImageEdit from "../../../Elements/Fields/ImageEdit";
import ImageInput from "../../../Elements/Fields/ImageInput";
import { getCookie } from "../../../../Utils";
import axios from "axios";
import UpdateCancelButtonMenu from "../../../Elements/Buttons/UpdateCancelButtonMenu";
import EditDeleteButtonMenu from "../../../Elements/Buttons/EditDeleteButtonMenu";
import Container from "../../../Elements/Layout/Container/Container";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
    maxHeight: 400,
  },
}));

function ProcessImage({ imageItem, preview = false, editMode }) {
  console.log("imageItem", imageItem);
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(imageItem);
  const [editing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [newImageData, setNewImageData] = useState(null);

  const handleImageChange = (event) => {
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
    setNewImageData(event.target.files[0]);
  };
  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/processimageitem/${data.id}/`,
        { image: newImageData, servicetier: data.servicetier },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data ? (
        <Item
          xs={12}
          sm={12}
          md={12}
          lg={preview ? 12 : 6}
          style={{
            minHeight: 375,
            paddingRight: isMediumScreen ? 0 : 24,
            alignItems: "center",
            display: "flex",
            order: isMediumScreen ? 2 : 1,
          }}
        >
          {!editing ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <CardMedia
                className={classes.image}
                image={data.image || imageItem}
              />
              {!editing && editMode ? (
                <EditDeleteButtonMenu
                  editClick={() => setEditing(!editing)}
                  hideDelete
                  position="end"
                  adminLink="processimageitem"
                  text="Process Image Item"
                  obj={data.id}
                />
              ) : null}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                flex
                justifyContent="center"
                style={{ marginTop: 16, padding: 8 }}
              >
                {data.image && (
                  <ImageEdit
                    xs={newImage ? 6 : 12}
                    header="Current Image"
                    image={`${data.image}/`}
                  />
                )}
                {newImage ? (
                  <ImageEdit header="New Image" image={`${newImage}`} />
                ) : null}
                <ImageInput
                  handleChange={handleImageChange}
                  handleClick={handleClick}
                  newImage={newImage}
                  newImageName={newImageName}
                />
              </Grid>
              <UpdateCancelButtonMenu
                handleCancel={() => setEditing(!editing)}
                position="center"
                placement={"bottom"}
              />
            </form>
          )}
        </Item>
      ) : null}
    </>
  );
}

export default ProcessImage;
