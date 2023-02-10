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
import EditField from "../../Elements/Fields/EditField";
import UpdateButton from "../../Elements/Buttons/UpdateButton";

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
}));

const ContentEdit = ({ content, onUpdate, type }) => {
  const classes = useStyles();
  const [contentType, setContentType] = useState([]);
  const [data, setData] = useState(content);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);

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
            <EditField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div style={{ marginBottom: 30 }}>
              <QuillField value={body} onChange={handleBody} size="large" />
            </div>
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default ContentEdit;
