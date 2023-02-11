import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CardMedia, TextField } from "@material-ui/core";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import EditField from "../../Elements/Fields/EditField";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    width: "100%",
    boxShadow: theme.shadows[0],
  },
  input: {
    width: "100%",
  },
  button: {
    minWidth: 140,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
  field: {
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.8rem",
      width: "100%",

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
      margin: 5,
      color: theme.palette.text.dark,
      fontWeight: "600",
      fontSize: "0.85rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  multiline: {
    marginTop: 5,
    marginBottom: 5,
    "& .MuiOutlinedInput-inputMultiline": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      padding: 10,
      marginLeft: 5,
      fontSize: "0.8rem",
      width: "100%",
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
      marginLeft: 5,
      fontWeight: "700",
      fontSize: "0.8rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
}));

const ProcessEdit = ({ process, updateProcess }) => {
  const classes = useStyles();
  const [data, setData] = useState(process);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [icon, setIcon] = useState(data.icon);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("icon", icon);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/processes/${data.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/processes/${data.id}/`
      );
      setData(res.data);
      updateProcess(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              className={classes.field}
              variant="outlined"
              label="Icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={classes.multiline}
              variant="outlined"
              label="Subheader"
              value={description}
              multiline
              minRows="4"
              onChange={(event) => setDescription(event.target.value)}
            />
          </CardContent>
          <UpdateButton color="black" />
        </form>
      </Card>
    </div>
  );
};

export default ProcessEdit;
