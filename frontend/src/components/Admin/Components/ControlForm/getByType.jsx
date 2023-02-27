import React from "react";
import ChoiceType from "./Types/ChoiceType";
import ImageType from "./Types/ImageType";
import ManyToManyType from "./Types/ManyToManyType";
import DateType from "./Types/DateType";
import FieldType from "./Types/FloatType";
import TextType from "./Types/TextType";
import CharType from "./Types/CharType";
import BooleanType from "./Types/BooleanType";

const getByType = (
  fieldName,
  fieldType,
  handleInputChange,
  choices,
  formData,
  handleManyToManyChange,
  handleImageChange,
  newImage,
  newImageName,
  xs_column_count,
  md_column_count
) => {
  switch (fieldType) {
    case "BooleanField":
      return (
        <BooleanType
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
        />
      );
    case "CharField":
    case "EmailField":
    case "StringRelatedField":
      return (
        <CharType
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    case "TextField":
      return (
        <TextType
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
        />
      );
    case "IntegerField":
    case "PositiveIntegerField":
    case "PositiveSmallIntegerField":
    case "SmallIntegerField":
    case "BigIntegerField":
    case "DecimalField":
    case "FloatField":
      return (
        <FieldType
          fieldName={fieldName}
          handleInputChange={handleInputChange}
        />
      );
    case "DateTimeField":
      return (
        <DateType fieldName={fieldName} handleInputChange={handleInputChange} />
      );
    case "ListSerializer":
      return (
        <ManyToManyType
          formData={formData}
          fieldName={fieldName}
          handleManyToManyChange={handleManyToManyChange}
        />
      );
    case "ImageField":
      return (
        <ImageType
          formData={formData}
          handleImageChange={handleImageChange}
          newImage={newImage}
          newImageName={newImageName}
        />
      );
    case "ChoiceField":
      return (
        <ChoiceType
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
          choices={choices}
        />
      );
    default:
      return null;
  }
};

export default getByType;
