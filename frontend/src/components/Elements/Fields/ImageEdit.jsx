import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 4,
  },
  imageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageHeader: {
    textAlign: "center",
    color: "black",
    paddingBottom: 20,
  },
  imagePadding: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
    maxHeight: 400,
  },
}));

const ImageEdit = ({ header, image, xs = 6 }) => {
  const classes = useStyles();

  return (
    <Grid item xs={xs} className={classes.imagePadding}>
      <div className={classes.imageContainer}>
        <div className={classes.imageBox}>
          <CardMedia className={classes.image} image={image} />
        </div>
      </div>
      <Typography variant="h4" className={classes.imageHeader}>
        {header}
      </Typography>
    </Grid>
  );
};

export default ImageEdit;
