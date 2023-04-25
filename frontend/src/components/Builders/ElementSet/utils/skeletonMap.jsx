import { Skeleton } from "@material-ui/lab";

import StandardListSkeleton from "../../Lists/skeletons/StandardListSkeleton";

import ImageSkeleton from "../skeletons/ImageSkeleton";
import { ImageSection } from "../../../Elements/Image/ImageSection";

import TextSkeleton from "../skeletons/TextSkeleton";
import AvatarListSkeleton from "../../Lists/skeletons/AvatarListSkeleton";
import ImageListSkeleton from "../../Lists/skeletons/ImageListSkeleton";
import IconListSkeleton from "../../Lists/skeletons/IconListSkeleton";

export function skeletonMap(contentType, subType, elementObject) {
  console.log("type", contentType);
  console.log("elementObject", elementObject);
  switch (contentType) {
    case "Image":
      switch (subType) {
        case "Small":
        case "Medium":
        case "Large":
        case "Full":
          return (
            <ImageSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        default:
          return (
            <ImageSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={null}
              elementType={elementObject ? elementObject.type : null}
            />
          );
      }
    case "Text":
      switch (subType) {
        case "Standard":
        case "Dense":
          return (
            <TextSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        default:
          return (
            <TextSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
      }
    case "Card":
      switch (subType) {
        case "Small":
          return <Skeleton variant="rect" width={450} height={300} />;
        case "Medium":
          return (
            <ImageSection
              image={elementObject ? elementObject.content_object.image : null}
              width={200}
            />
          );
        case "Large":
          return (
            <ImageSection
              image={elementObject ? elementObject.content_object.image : null}
              width={400}
            />
          );
        default:
          return <Skeleton variant="rect" width={450} height={300} />;
      }
    case "List":
      switch (subType) {
        case "Standard":
          return (
            <StandardListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        case "Image":
          return <ImageListSkeleton />;
        case "Icon":
          return <IconListSkeleton />;
        case "Avatar":
          return <AvatarListSkeleton />;
        default:
          return (
            <StandardListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
      }
    default:
      return null;
  }
}
