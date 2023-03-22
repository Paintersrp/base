import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

const MemberEdit = ({ member, onUpdate, handleCancel }) => {
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [formData, setFormData] = useState(member);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
      setNewImage(URL.createObjectURL(event.target.files[0]));
      // setNewImage(URL.createObjectURL(event.target.files[0]));
      setNewImageName(event.target.files[0].name);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    console.log("test");
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
      await axios.patch(
        `http://localhost:8000/api/teammember/${formData.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/teammember/${formData.id}/`
      );
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseEditForm
      title="Edit Member"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      width="350px"
      excludeKeys={["id", "image"]}
      multilineKeys={["bio"]}
      handleCancel={handleCancel}
      imageMixin
      newImage={newImage}
      newImageName={newImageName}
    />
  );
};

export default MemberEdit;
