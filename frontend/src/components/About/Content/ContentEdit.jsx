import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import QuillField from "../../Elements/Fields/QuillField";
import { useEffect } from "react";
import { getCookie } from "../../../Utils";
import FormField from "../../Elements/Fields/FormField";
import StyledButton from "../../Elements/Buttons/StyledButton";
import UpdateCancelButtonMenu from "../../Elements/Buttons/UpdateCancelButtonMenu";

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
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  quillMargins: {
    marginBottom: 16,
    marginRight: 8,
    marginTop: 8,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
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

const ContentEdit = ({ content, onUpdate, type, handleCancel }) => {
  const classes = useStyles();
  const [contentType, setContentType] = useState([]);
  const [data, setData] = useState(content);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);

  useEffect(() => {
    setContentType(type);
  }, []);

  const handleSubmit = async (e) => {
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
      await axios
        .patch(`http://localhost:8000/api/${contentType}/1/`, formData, config)
        .then((res) => {
          setData(res.data);
          onUpdate(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBody = (value) => {
    setBody(value);
  };

  return (
    <div className={`${classes.root} ${classes.fadeIn}`}>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent className={classes.cardContent}>
            <FormField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className={classes.quillMargins}>
              <QuillField value={body} onChange={handleBody} size="large" />
            </div>
          </CardContent>
          <UpdateCancelButtonMenu
            handleCancel={handleCancel}
            placement="bottom"
            position="center"
          />
          {/* <div className={classes.buttonContainer}>
            <StyledButton
              type="submit"
              buttonText="Update"
              minWidth="0"
              size="small"
            />
            <StyledButton
              buttonText="Cancel"
              onClick={handleCancel}
              minWidth="0"
              size="small"
            />
          </div> */}
        </form>
      </Card>
    </div>
  );
};

export default ContentEdit;
