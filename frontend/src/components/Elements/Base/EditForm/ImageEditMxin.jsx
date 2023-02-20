import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ImageEdit from "../../Fields/ImageEdit";
import ImageInput from "../../Fields/ImageInput";

function ImageEditMixin({ handleChange, formData, newImage, newImageName }) {
  const [image, setImage] = useState(formData.image);

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <>
      <Grid container flex justifyContent="center">
        {formData.image && (
          <ImageEdit header="Current Image" image={`${image}/`} />
        )}
        {newImage ? (
          <ImageEdit header="New Image" image={`${newImage}`} />
        ) : null}
      </Grid>
      <ImageInput
        handleChange={handleChange}
        handleClick={handleClick}
        newImage={newImage}
        newImageName={newImageName}
      />
    </>
  );
}

export default ImageEditMixin;
