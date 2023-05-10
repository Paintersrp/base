import { Skeleton } from "@material-ui/lab";

import StandardListSkeleton from "../../Lists/skeletons/StandardListSkeleton";

import ImageSkeleton from "../skeletons/ImageSkeleton";
import { ImageSection } from "../../../Elements/Image/ImageSection";

import TextSkeleton from "../skeletons/TextSkeleton";
import AvatarListSkeleton from "../../Lists/skeletons/AvatarListSkeleton";
import ImageListSkeleton from "../../Lists/skeletons/ImageListSkeleton";
import IconListSkeleton from "../../Lists/skeletons/IconListSkeleton";
import FAQListSkeleton from "../../FAQs/skeletons/FAQListSkeleton";
import FAQTabsSkeleton from "../../FAQs/skeletons/FAQTabsSkeleton";
import FAQCondensedSkeleton from "../../FAQs/skeletons/FAQCondensedSkeleton";
import StandardCardSkeleton from "../../Cards/skeletons/StandardCardSkeleton";
import DenseCardSkeleton from "../../Cards/skeletons/DenseCardSkeleton";
import TileSkeleton from "../../Cards/skeletons/TileSkeleton";

export function skeletonMap(contentType, subType, elementObject) {
  console.log("type", contentType);
  console.log("subType", subType);
  console.log("elementObject", elementObject);
  switch (contentType) {
    case "Image":
      switch (
        subType
          ? subType
          : elementObject
          ? elementObject.content_object.type
          : null
      ) {
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
      switch (
        subType
          ? subType
          : elementObject
          ? elementObject.content_object.type
          : null
      ) {
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
      switch (
        subType
          ? subType
          : elementObject
          ? elementObject.content_object.type
          : null
      ) {
        case "Standard":
          return (
            <StandardCardSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
            />
          );
        case "Tile":
          return (
            <TileSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
            />
          );
        case "Dense":
          return (
            <DenseCardSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
            />
          );
        default:
          return <StandardCardSkeleton />;
      }
    case "FAQ":
      switch (
        subType
          ? subType
          : elementObject
          ? elementObject.content_object.type
          : null
      ) {
        case "List":
          return (
            <FAQListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        case "Condensed":
          return (
            <FAQCondensedSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        case "Tabbed":
          return (
            <FAQTabsSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        default:
          return (
            <FAQCondensedSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
      }
    case "List":
      switch (
        subType
          ? subType
          : elementObject
          ? elementObject.content_object.type
          : null
      ) {
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
          return (
            <ImageListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        case "Icon":
          return (
            <IconListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
        case "Avatar":
          return (
            <AvatarListSkeleton
              contentObject={
                elementObject ? elementObject.content_object : null
              }
              subType={subType}
              elementType={elementObject ? elementObject.type : null}
            />
          );
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
