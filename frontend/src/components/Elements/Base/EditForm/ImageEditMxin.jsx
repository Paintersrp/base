import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ImageEdit from "../../Fields/ImageEdit";
import ImageInput from "../../Fields/ImageInput";
import { useMediaQuery, useTheme } from "@material-ui/core";

function ImageEditMixin({ handleChange, formData, newImage, newImageName }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [image, setImage] = useState(formData.image);

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <>
      <Grid container flex justifyContent="center">
        {image && (
          <ImageEdit
            xs={newImage ? 6 : isSmallScreen ? 12 : 9}
            header="Current Image"
            image={`${image}/`}
          />
        )}
        {newImage ? (
          <ImageEdit
            header="New Image"
            xs={image ? 6 : isSmallScreen ? 12 : 9}
            image={`${newImage}`}
          />
        ) : null}
      </Grid>
      <ImageInput
        xs={12}
        md={9}
        handleChange={handleChange}
        handleClick={handleClick}
        newImage={newImage}
        newImageName={newImageName}
      />
    </>
  );
}

export default ImageEditMixin;
