import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { CardMedia, Typography } from "@material-ui/core";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import EditField from "../../Elements/Fields/EditField";
import { getCookie } from "../../../Utils";
import { baseClasses } from "../../../classes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    color: "black",
  },
  image: {
    width: "50%",
    paddingBottom: "56.25%",
  },
}));

const QAEdit = ({ QA, onUpdate, onEdit }) => {
  const classes = useStyles();
  const [data, setData] = useState(QA);
  const [question, setQuestion] = useState(data.question);
  const [answer, setAnswer] = useState(data.answer);
  const [category, setCategory] = useState(data.category_name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("category", category);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/faqs/${data.id}/`,
        formData,
        config
      );
      onUpdate();
      onEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes.root}`}>
      <Card className={classes.card} elevation={0}>
        <form onSubmit={handleSubmit}>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            {data.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <CardMedia className={classes.image} image={`${image}/`} />
                </div>
              </div>
            )}
            <EditField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <EditField
              label="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <EditField
              label="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              multiline
            />
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default QAEdit;
