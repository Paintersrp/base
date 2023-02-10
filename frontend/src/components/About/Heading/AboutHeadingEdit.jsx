import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../Utils";
import EditField from "../../Elements/Fields/EditField";
import UpdateButton from "../../Elements/Buttons/UpdateButton";

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
}));

const AboutHeadingEdit = ({ aboutBlock, onUpdate }) => {
  const classes = useStyles();
  const [headData, setHeadData] = useState(aboutBlock);
  const [title, setTitle] = useState(headData.title);
  const [image, setImage] = useState(headData.image);

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

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography
            variant="h5"
            color="black"
            style={{ textAlign: "center" }}
          >
            About Block Change
          </Typography>
          <EditField
            key="title"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <CardContent>
            {aboutBlock.image && (
              <div className={classes.root}>
                <div className={classes.root}>
                  <CardMedia
                    className={classes.image}
                    image={`${aboutBlock.image}/`}
                  />
                </div>
              </div>
            )}
            <Typography style={{ color: "black" }}>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Typography>
          </CardContent>
          <UpdateButton />
        </div>
      </div>
    </form>
  );
};

export default AboutHeadingEdit;
