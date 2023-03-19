import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, useMediaQuery, useTheme } from "@material-ui/core";
import Item from "../../../Elements/Layout/Item/Item";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
    maxHeight: 400,
  },
}));

function ProcessImage({ imageItem, preview = false }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
      <CardMedia className={classes.image} image={imageItem} />
    </Item>
  );
}

export default ProcessImage;
