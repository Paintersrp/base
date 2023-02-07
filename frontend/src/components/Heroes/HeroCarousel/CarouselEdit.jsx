import React, { useState, useEffect } from "react";
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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const useStyles = makeStyles((theme) => ({
  pricingCard: {
    color: "white",
    backgroundColor: "#212121",
    maxWidth: 375,
    minWidth: 375,
    margin: theme.spacing(4),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[7],
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.005)",
      boxShadow: theme.shadows[14],
    },

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  pricingTitle: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
    fontSize: "1.75rem",
    textAlign: "center",
    fontFamily: "Poppins",
    color: "gold",
    opacity: 0.9,
  },
  pricingPrice: {
    fontSize: "1.3rem",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    margin: 0,
  },
  pricingFeatures: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    minHeight: 400,
  },
  pricingButton: {
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  checkIcon: {
    color: "gold;",
    marginRight: "10px",
  },
  media: {
    height: 200,
    width: "auto",
    scale: "0.95",
    padding: 0,
    marginBottom: 20,
    "&:hover": {
      transform: "scale(1.02)",
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
    console.log(item);
    setOpen(true);
    setSelectedItem(item);
    setId(index + 1);
    setLink(item.buttonLink);
    setText(item.buttonText);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:8000/api/items/${id}/`
    );
    if (response.status === 204) {
      setItems(items.filter((item) => item.id !== id));
      handleClose();
    }
  };

  return (
    <Box m={2}>
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
                  onClick={() => handleClickOpen(item, index)}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
          <CardMedia
            className={classes.media}
            image={selectedItem.image}
            title={selectedItem.title}
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
              defaultValue={selectedItem.buttonText}
              onChange={(event) => setText(event.target.value)}
            />
            <TextField
              margin="dense"
              id="buttonLink"
              label="Button Link"
              type="text"
              fullWidth
              defaultValue={selectedItem.buttonLink}
              onChange={(event) => setLink(event.target.value)}
            />
            <Typography className="">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
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
      ) : null}
    </Box>
  );
};

export default CarouselEdit;
