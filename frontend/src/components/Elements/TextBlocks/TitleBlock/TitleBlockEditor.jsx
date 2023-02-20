import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../../utils";
import BaseEditForm from "../../Base/EditForm/BaseEditForm";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  field: {
    "& .MuiOutlinedInput-root": {
      fontSize: "0.85rem",
      "& fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.dark,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  select: {
    background: theme.palette.text.light,
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const TitleBlockEditor = ({ titleBlock, onUpdate, handleCancel }) => {
  const classes = useStyles();
  const [state, setState] = useState({ ...titleBlock });

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
    // let formData = new FormData();
    // formData.append("name", state.name);
    // formData.append("title", state.title);
    // formData.append("subtitle", state.subtitle);
    // formData.append("alignment", state.alignment);
    // formData.append("show_divider", state.show_divider);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/titleblock/${titleBlock.name}/`,
        state,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/titleblock/${titleBlock.name}/`
      );
      onUpdate(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseEditForm
      title="Edit Title Block"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={state}
      width="75%"
      excludeKeys={["name", "id", "alignment", "show_divider"]}
      multilineKeys={["answer"]}
      titleBlockMixin
      handleSwitchChange={handleSwitchChange}
      handleCancel={handleCancel}
    />
  );
};

export default TitleBlockEditor;
