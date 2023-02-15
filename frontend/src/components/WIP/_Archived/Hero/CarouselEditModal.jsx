import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  CardMedia,
  TextField,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { getCookie } from "../../../../utils";

const useStyles = makeStyles(() => ({
  media: {
    height: 200,
    width: "auto",
    scale: "0.95",
    padding: 0,
    marginBottom: 20,
  },
}));

const CarouselEditModal = ({ item, open, updateCarousel, id, handleClose }) => {
  const classes = useStyles();
  const [image, setImage] = useState([]);
  const [link, setLink] = useState(item.buttonLink);
  const [text, setText] = useState(item.buttonText);

  const handleEdit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("text", text);
    formData.append("link", link);

    if (image.name) {
      formData.append("image", image, image.name);
    }

    console.log(formData);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/items/${id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/items/`);
      updateCarousel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.title}
        justifyContent="center"
        alignItems="center"
      />
      <DialogContent>
        <TextField
          margin="dense"
          id="buttonText"
          label="Button Text"
          type="text"
          fullWidth
          defaultValue={item.buttonText}
          onChange={(event) => setText(event.target.value)}
        />
        <TextField
          margin="dense"
          id="buttonLink"
          label="Button Link"
          type="text"
          fullWidth
          defaultValue={item.buttonLink}
          onChange={(event) => setLink(event.target.value)}
        />
        <Typography className="">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarouselEditModal;
