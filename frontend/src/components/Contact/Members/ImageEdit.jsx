import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  image: {
    width: "50%",
    paddingBottom: "56.25%",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
  },
  imageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageHeader: {
    marginBottom: 16,
    paddingBottom: 4,
    borderBottom: "1px solid black",
    textAlign: "center",
  },
  imagePadding: {
    paddingLeft: 4,
    paddingRight: 4,
  },
}));

const ImageEdit = ({ header, image }) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.imagePadding}>
      <Typography variant="h4" className={classes.imageHeader}>
        {header}
      </Typography>
      <div className={classes.imageContainer}>
        <div className={classes.imageBox}>
          <CardMedia className={classes.image} image={image} />
        </div>
      </div>
    </Grid>
  );
};

export default ImageEdit;
