import { ImageSection } from "../../../Elements/Image/ImageSection";

export function elementObjectMap(contentType, elementObject) {
  //   console.log(contentType, elementObject);
  switch (contentType) {
    case "Image":
      switch (elementObject.content_object.type) {
        case "Small":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={350}
            />
          );
        case "Medium":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={450}
            />
          );
        case "Large":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={550}
            />
          );
        case "Full":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={650}
            />
          );
        default:
          return null;
      }
    case "Text":
      switch (elementObject.content_object.type) {
        case "Small":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={100}
            />
          );
        case "Medium":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={200}
            />
          );
        case "Large":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={400}
            />
          );
        default:
          return null;
      }
    case "Card":
      switch (elementObject.content_object.type) {
        case "Small":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={100}
            />
          );
        case "Medium":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={200}
            />
          );
        case "Large":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={400}
            />
          );
        default:
          return null;
      }
    case "List":
      switch (elementObject.content_object.type) {
        case "Small":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={100}
            />
          );
        case "Medium":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={200}
            />
          );
        case "Large":
          return (
            <ImageSection
              image={elementObject.content_object.image}
              width={400}
            />
          );
        default:
          return null;
      }
    default:
      return null;
  }
}
