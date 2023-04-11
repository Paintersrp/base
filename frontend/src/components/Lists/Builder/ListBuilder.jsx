import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { makeStyles } from "@material-ui/core/styles";
import BaseContent from "../../Elements/Base/BaseContent";
import { v4 as uuidv4 } from "uuid";
import { validateListAdd, validateListSubmit } from "./ListValidation";
import ListBuilderHead from "./ListBuilderHead";
import ListBuilderBody from "./ListBuilderBody";
import ListBuilderPreview from "./ListBuilderPreview";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
}));

const ListBuilder = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [apiErrors, setApiErrors] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [formData, setFormData] = useState({
    listName: "",
    listType: "",
    primary: "",
    secondary: "",
    icon: "",
    order: "",
    image: "",
  });

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
          setFormData({
            listName: "",
            listType: "",
            primary: "",
            secondary: "",
            icon: "",
            order: "",
            image: "",
          });
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
    setFormData({
      ...formData,
      primary: "",
      secondary: "",
      icon: "",
      order: "",
      image: "",
    });
  };

  const handleEdit = (index) => {
    const itemToEdit = listItems[index];

    setFormData({
      ...formData,
      primary: itemToEdit.primary,
      secondary: itemToEdit.secondary,
      icon: itemToEdit.icon,
      order: itemToEdit.order,
      image: itemToEdit.image,
    });
    handleDelete(index);
  };

  const handleClearItems = () => {
    setListItems([]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h1" align="center">
          Create a List
        </Typography>
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
      </Paper>
    </div>
  );
};

export default ListBuilder;
