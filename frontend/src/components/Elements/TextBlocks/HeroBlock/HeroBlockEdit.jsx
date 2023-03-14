import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../../utils";
import BaseEditForm from "../../Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

const HeroBlockEdit2 = ({ heroBlock, onUpdate, handleCancel }) => {
  const [state, setState] = useState({ ...heroBlock });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/heroblock/main/`,
        state,
        config
      );
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseEditForm
      title="Edit Hero Block"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={state}
      width="75%"
      excludeKeys={["name", "id"]}
      multilineKeys={["text"]}
      handleSwitchChange={handleSwitchChange}
      handleCancel={handleCancel}
    />
  );
};

export default HeroBlockEdit2;
