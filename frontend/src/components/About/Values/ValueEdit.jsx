import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
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
      const res = await axios.patch(
        `http://localhost:8000/api/values/${data.id}/`,
        formData,
        config
      );
      onUpdate(res.data);
      setData(formData);
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
