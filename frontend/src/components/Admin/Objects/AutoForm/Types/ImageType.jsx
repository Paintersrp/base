import React from "react";
import { Grid } from "@material-ui/core";
import ImageEditMixin from "../../../../Elements/Base/EditForm/ImageEditMxin";

const ImageType = ({ formData, handleImageChange, newImage, newImageName }) => {
  return (
    <Grid
      item
      xs={12}
      style={{
        order: 0,
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <ImageEditMixin
        formData={formData}
        handleChange={handleImageChange}
        newImage={newImage}
        newImageName={newImageName}
      />
    </Grid>
  );
};

export default ImageType;
