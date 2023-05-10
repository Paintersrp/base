import React, { useEffect, useState } from "react";

import { CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { elementSetExampleStyles } from "../examples/styles/exampleStyles";
import Flexer from "../../../Elements/Layout/Container/Flexer";

function ImageSkeleton({ contentObject = null, subType, elementType }) {
  const classes = elementSetExampleStyles();
  const [padding, setPadding] = useState(null);
  const [skeletonSettings, setSkeletonSettings] = useState({
    width: "90%",
    height: 360,
  });

  useEffect(() => {
    switch (elementType === "Image" ? contentObject.type : subType) {
      case "Small":
        setPadding(96);
        setSkeletonSettings({
          width: 403,
          height: 252,
        });
        break;
      case "Medium":
        setPadding(64);
        setSkeletonSettings({
          width: 460,
          height: 288,
        });
        break;
      case "Large":
        setPadding(32);
        setSkeletonSettings({
          width: "85%",
          height: 340,
        });
        break;
      case "Full":
        setPadding(0);
        setSkeletonSettings({
          width: "90%",
          height: 360,
        });
        break;
      default:
        setPadding(0);
    }
  }, [contentObject, subType]);

  return (
    <div style={{ width: "100%" }}>
      <Flexer
        j="c"
        a="c"
        style={{
          padding: padding,
        }}
      >
        {contentObject && elementType === "Image" ? (
          <CardMedia
            image={contentObject.image}
            className={classes.image}
            alt="Section Image"
          />
        ) : (
          <Skeleton
            variant="rect"
            width={skeletonSettings.width}
            height={skeletonSettings.height}
            style={{
              marginTop: 24,
            }}
          />
        )}
      </Flexer>
    </div>
  );
}

export default ImageSkeleton;
