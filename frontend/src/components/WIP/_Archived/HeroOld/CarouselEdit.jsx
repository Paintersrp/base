import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  CardMedia,
  TextField,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { getCookie } from "../../../../utils";
import CarouselEditModal from "./CarouselEditModal";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
    width: "auto",
    scale: "0.95",
    padding: 0,
    marginBottom: 20,
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

const CarouselEdit = ({ items, updateCarousel }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [image, setImage] = useState([]);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  const handleClickOpen = (item, index) => {
    setOpen(true);
    setSelectedItem(item);
    setId(item.id);
    setLink(item.buttonLink);
    setText(item.buttonText);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("text", text);
    formData.append("link", link);

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

  const handleDelete = async (item) => {
    const response = await axios.delete(
      `http://localhost:8000/api/items/${item.id}/`
    );
    if (response.status === 204) {
      try {
        const res = await axios.get(`http://localhost:8000/api/items/`);
        updateCarousel(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box m={2} className={classes.fadeIn}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image={item.image}
                  title={item.title}
                  justifyContent="center"
                  alignItems="center"
                />
                <Typography gutterBottom variant="h5" component="h2">
                  {item.buttonText}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.buttonLink}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleClickOpen(item, index)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem ? (
        <CarouselEditModal
          item={selectedItem}
          open={open}
          updateCarousel={updateCarousel}
          handleClose={handleClose}
          id={id}
        />
      ) : null}
    </Box>
  );
};

export default CarouselEdit;
