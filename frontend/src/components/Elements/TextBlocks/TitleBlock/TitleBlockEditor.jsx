import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../../utils";
import BaseEditForm from "../../Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

const TitleBlockEditor = ({
  titleBlock,
  onUpdate,
  handleCancel,
  description = true,
}) => {
  const [state, setState] = useState({ ...titleBlock });
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
        `http://localhost:8000/api/titleblock/${titleBlock.name}/`,
        state,
        config
      );
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const res = await axios.get(
    //     `http://localhost:8000/api/titleblock/${titleBlock.name}/`
    //   );
    //   onUpdate(res.data);
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <BaseEditForm
      title="Edit Title Block"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={state}
      width="75%"
      excludeKeys={
        description
          ? ["name", "id", "alignment", "show_divider"]
          : ["name", "id", "alignment", "show_divider", "description"]
      }
      multilineKeys={description ? ["description"] : [""]}
      titleBlockMixin
      handleSwitchChange={handleSwitchChange}
      handleCancel={handleCancel}
    />
  );
};

export default TitleBlockEditor;
