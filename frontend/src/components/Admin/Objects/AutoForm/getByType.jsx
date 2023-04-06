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
import FileType from "./Types/FileType";
import JSONType from "./Types/JSONType/JSONType";

const getByType = (
  fieldMetadata,
  fieldName,
  modelMetadata,
  verboseName,
  fieldType,
  handleInputChange,
  choices,
  formData,
  setFormData,
  handleManyToManyChange,
  handleImageChange,
  handleQuillChange,
  handleComponentsChange,
  handleModelNameChange,
  newImage,
  newImageName,
  xs_column_count,
  md_column_count,
  justify,
  markDownMixin,
  min_rows,
  help_text,
  handleModalUpdate
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
    case "URLField":
    case "SlugField":
      return (
        <CharType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          justifyContent={justify}
          helpText={help_text}
          modelMetadata={modelMetadata}
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
          helpText={help_text}
        />
      );
    case "TextField":
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
          helpText={help_text}
          min_rows={min_rows}
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
          helpText={help_text}
        />
      );
    case "DateTimeField":
      return (
        <DateType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
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
          helpText={help_text}
          handleComponentsChange={handleComponentsChange}
          modelMetadata={modelMetadata}
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
    case "PrimaryKeyRelatedField":
      return (
        <ChoiceType
          fieldType={fieldType}
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          choices={choices}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          helpText={help_text}
          fieldMetadata={fieldMetadata}
          handleModalUpdate={handleModalUpdate}
          handleModelNameChange={handleModelNameChange}
        />
      );
    case "FileField":
      return (
        <FileType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    case "JSONField":
      return (
        <JSONType
          fieldName={fieldName}
          formData={formData}
          modelMetadata={modelMetadata}
          handleComponentsChange={handleComponentsChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    default:
      if (fieldType.includes("Serializer")) {
        console.log("yeeters");
        return (
          <ForeignKeyType
            formData={formData}
            fieldName={fieldName}
            verboseName={verboseName}
            handleInputChange={handleInputChange}
            xsColumnCount={xs_column_count}
            mdColumnCount={md_column_count}
            helpText={help_text}
          />
        );
      }
      return null;
  }
};

export default getByType;
