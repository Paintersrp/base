import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  ImageListItemBar,
  ImageListItem,
  ImageList,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#242424",
    padding: theme.spacing(2),
  },
  imageList: {
    overflow: "hidden",
    maxWidth: 1200,
  },
  imageListItem: {
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.005)",
    },
  },
  imgItem: {
    borderRadius: 14,
  },
  [theme.breakpoints.down("sm")]: {
    imageList: {
      maxWidth: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    imageListItem: {
      width: "80% !important",
      marginBottom: theme.spacing(1),
    },
  },
  [theme.breakpoints.down("xs")]: {
    imageList: {
      maxWidth: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    imageListItem: {
      width: "95% !important",
      marginBottom: theme.spacing(1),
    },
  },
  dialogTitle: {
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContent: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 8px",
  },
  dialogImg: {
    width: "100%",
    maxWidth: 700,
  },
  dialogDescription: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: 0,
    color: "black",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  dialogPaper: {
    maxWidth: 800,
    borderRadius: 14,
    backgroundColor: "white",
  },
  closeButton: {
    color: "black",
    marginRight: 7,
    marginBottom: 7,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#CCCCCC",
    },
  },
  itemBarText: {
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
}));

const ImageGallery = ({ images }) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = React.useState({
    title: "",
    url: "",
    description: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList}>
        {images.map((image) => (
          <ImageListItem
            key={image.id}
            className={classes.imageListItem}
            onClick={() => handleClickOpen(image)}
            classes={{
              item: classes.imgItem,
            }}
          >
            <img
              src={image.url}
              alt={image.title}
              className={classes.imgItem}
            />
            <ImageListItemBar
              title={image.title}
              classes={{
                title: classes.itemBarText,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="image-dialog-title"
        aria-describedby="image-dialog-description"
        classes={{
          paper: classes.dialogPaper,
        }}
      >
        <DialogTitle id="image-dialog-title" className={classes.dialogTitle}>
          {selectedImage.title}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className={classes.dialogImg}
          />
          <DialogContentText
            id="image-dialog-description"
            className={classes.dialogDescription}
          >
            {selectedImage.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.closeButton}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
