import React from "react";
import ChoiceType from "../../Objects/AutoForm/Types/ChoiceType";
import ImageType from "../../Objects/AutoForm/Types/ImageType";
import ManyToManyType from "../../Objects/AutoForm/Types/ManyToManyType";
import DateType from "../../Objects/AutoForm/Types/DateType";
import FieldType from "../../Objects/AutoForm/Types/FloatType";
import TextType from "../../Objects/AutoForm/Types/TextType";
import CharType from "../../Objects/AutoForm/Types/CharType";
import BooleanType from "../../Objects/AutoForm/Types/BooleanType";
import ForeignKeyType from "../../Objects/AutoForm/Types/ForeignKeyType";

const getByType = (
  fieldName,
  verboseName,
  fieldType,
  handleInputChange,
  choices,
  formData,
  setFormData,
  handleManyToManyChange,
  handleImageChange,
  handleQuillChange,
  newImage,
  newImageName,
  xs_column_count,
  md_column_count,
  justify,
  markDownMixin
) => {
  console.log(markDownMixin);
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
      console.log("WTF: ", markDownMixin);
      return (
        <TextType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          handleQuillChange={handleQuillChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          markDownMixin={markDownMixin}
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
          setFormData={setFormData}
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
