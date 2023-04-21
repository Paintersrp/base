import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import axiosInstance from "../../../lib/Axios/axiosInstance";

import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BaseContent from "../../Elements/Base/BaseContent";

import ListBuilderHead from "./components/Head/ListBuilderHead";
import ListBuilderBody from "./components/Body/ListBuilderBody";
import ListBuilderPreview from "./components/Preview/ListBuilderPreview";
import { validateListAdd, validateListSubmit } from "./utils/listValidation";
import { initialListFormData } from "./const/listContants";
import {
  editListItemFormData,
  resetListItemFormData,
} from "./utils/listUtilities";

const ListBuilder = () => {
  const [errors, setErrors] = useState("");
  const [apiErrors, setApiErrors] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [formData, setFormData] = useState(initialListFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "order" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (event) => {
    setApiErrors("");
    event.preventDefault();
    const listData = {
      name: formData.listName,
      type: formData.listType,
      listItems: listItems.map((item) => ({
        ...item,
        name: `${formData.listName}-${formData.listType}-${uuidv4()}`,
        tag: formData.listName,
      })),
    };

    let errors = validateListSubmit(listData);
    setApiErrors(errors);
    if (errors.length > 0) {
      return;
    }

    console.log("Submitted: ", listData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axiosInstance
        .post("/list-builder/", listData, config)
        .then((response) => {
          setErrors([]);
          setListItems([]);
          setFormData(initialListFormData);
        });
    } catch (error) {
      setApiErrors(error.response.data);
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();

    let errors = validateListAdd(formData, listItems);
    setErrors(errors);
    if (errors.length > 0) {
      return;
    }

    const newItem = {
      primary: formData.primary,
      secondary: formData.secondary,
      icon: formData.icon,
      order: formData.order,
      image: formData.image,
    };

    setListItems((prevItems) =>
      [...prevItems, newItem].sort((a, b) => a.order - b.order)
    );

    handleClear();
  };

  const handleThumbnailImageChange = (event) => {
    const file = event.target.files[0];
    setThumbnailImage(file);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleDelete = (index) => {
    const newListItems = [...listItems];
    newListItems.splice(index, 1);
    setListItems(newListItems);
  };
  const handleClear = () => {
    setFormData(resetListItemFormData(formData));
  };

  const handleEdit = (index) => {
    const itemToEdit = listItems[index];

    setFormData(editListItemFormData(formData, itemToEdit));
    handleDelete(index);
  };

  const handleClearItems = () => {
    setListItems([]);
  };

  return (
    <BaseBuilder header="Create a List" headerGutter>
      <ListBuilderHead
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        apiErrors={apiErrors}
      />

      <form onSubmit={handleSubmit}>
        <BaseContent>
          <Grid container>
            <ListBuilderBody
              formData={formData}
              handleChange={handleChange}
              handleClear={handleClear}
              handleThumbnailImageChange={handleThumbnailImageChange}
              errors={errors}
              handleAdd={handleAdd}
            />
            <ListBuilderPreview
              formData={formData}
              listItems={listItems}
              setListItems={setListItems}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleClearItems={handleClearItems}
            />
          </Grid>
        </BaseContent>
      </form>
    </BaseBuilder>
  );
};

export default ListBuilder;
