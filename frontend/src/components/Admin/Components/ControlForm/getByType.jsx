import React from "react";
import ChoiceType from "./Types/ChoiceType";
import ImageType from "./Types/ImageType";
import ManyToManyType from "./Types/ManyToManyType";
import DateType from "./Types/DateType";
import FieldType from "./Types/FloatType";
import TextType from "./Types/TextType";
import CharType from "./Types/CharType";
import BooleanType from "./Types/BooleanType";
import ForeignKeyType from "./Types/ForeignKeyType";

const getByType = (
  fieldName,
  verboseName,
  fieldType,
  handleInputChange,
  choices,
  formData,
  handleManyToManyChange,
  handleImageChange,
  newImage,
  newImageName,
  xs_column_count,
  md_column_count,
  justify
) => {
  switch (fieldType) {
    case "BooleanField":
      return (
        <BooleanType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          justifyContent={justify}
        />
      );
    case "CharField":
    case "EmailField":
      return (
        <CharType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    case "StringRelatedField":
      return (
        <ForeignKeyType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
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
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
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
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
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
          verboseName={verboseName}
          handleManyToManyChange={handleManyToManyChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
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
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          choices={choices}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    default:
      return null;
  }
};

export default getByType;
