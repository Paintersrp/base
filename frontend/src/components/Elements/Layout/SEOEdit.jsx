import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import BaseDialog from "../Base/BaseDialog";

const SEOEdit = ({ data, onUpdate, handleCancel }) => {
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [formData, setFormData] = useState(data);

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
      setNewImage(URL.createObjectURL(event.target.files[0]));
      setNewImageName(event.target.files[0].name);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      formData.image = member.image;
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/header/${formData.page}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/header/${formData.page}/`
      );
      setFormData(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseEditForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      width="500px"
      excludeKeys={["id", "image", "page"]}
      multilineKeys={["description", "keywords", "title"]}
      handleCancel={handleCancel}
      imageMixin
      newImage={newImage}
      newImageName={newImageName}
      fadeIn={false}
      placement="top"
      noBoxShadow={true}
    />
  );
};

export default SEOEdit;
