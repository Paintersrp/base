import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import EditField from "../../Elements/Fields/EditField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    color: "black",
  },
  input: {
    width: "100%",
  },
  button: {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: "black",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
  field: {
    margin: 2,
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.8rem",
      width: "100%",

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      margin: 5,
      color: "black",
      fontWeight: "600",
      fontSize: "0.85rem",
    },
    "& input": {
      color: "black",
    },
  },
}));

const ValueEdit = ({ value, onUpdate }) => {
  const classes = useStyles();
  const [data, setData] = useState(value);
  const [title, setTitle] = useState(data.title);
  const [icon, setIcon] = useState(data.icon);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("icon", icon);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/values/${data.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/values/${data.id}/`
      );
      setData(res.data);
      onUpdate(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <form onSubmit={handleSubmit}>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <EditField
              label="Icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
            />
            <EditField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default ValueEdit;
