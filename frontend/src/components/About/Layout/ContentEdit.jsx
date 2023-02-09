import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";
import QuillField from "../../Elements/Fields/QuillField";
import { useEffect } from "react";
import { getCookie } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    color: "black",
    width: "100%",
    boxShadow: theme.shadows[0],
  },
  input: {
    width: "100%",
  },
  field: {
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
  multiline: {
    marginTop: 5,
    marginBottom: 5,
    "& .MuiOutlinedInput-inputMultiline": {
      color: "white",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      padding: 10,
      marginLeft: 5,
      fontSize: "0.8rem",
      width: "100%",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      marginLeft: 5,
      fontWeight: "700",
      fontSize: "0.8rem",
    },
    "& input": {
      color: "white",
    },
  },
}));

const ContentEdit = ({ content, onUpdate, type }) => {
  const classes = useStyles();
  const [contentType, setContentType] = useState([]);
  const [data, setData] = useState(content);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [icon, setIcon] = useState(data.icon);

  useEffect(() => {
    setContentType(type);
  }, []);

  const handleSubmit = async (e) => {
    console.log(body);
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);

    if (body === "<p><br></p>" || body === null) {
      formData.append("body", "");
    } else {
      formData.append("body", body);
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/${contentType}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/${contentType}/`);
      setData(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBody = (value) => {
    setBody(value);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              className={classes.field}
              variant="outlined"
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <QuillField value={body} onChange={handleBody} />
          </CardContent>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              type="submit"
              style={{
                width: 50,
                color: "black",
                borderColor: "grey",
                height: 25,
                fontSize: "0.75rem",
              }}
            >
              Update
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default ContentEdit;
