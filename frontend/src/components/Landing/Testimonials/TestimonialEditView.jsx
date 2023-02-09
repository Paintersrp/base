import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  field: {
    "& .MuiOutlinedInput-inputMultiline": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "0.85rem",
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
      fontWeight: "700",
      fontSize: "0.85rem",
    },
    "& input": {
      color: "white",
    },
  },
}));

const TestimonialEditView = ({ testimonial, onUpdate }) => {
  const classes = useStyles();
  const [testimonialData, setTestimonialData] = useState({
    ...testimonial,
  });

  const handleChange = (event) => {
    setTestimonialData({
      ...testimonialData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(testimonialData);
    e.preventDefault();

    let formData = new FormData();
    formData.append("heading", testimonialData.heading);
    formData.append("text", testimonialData.text);
    formData.append("name", testimonialData.name);
    formData.append("position", testimonialData.position);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/testimonials/${testimonialData.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/testimonials/`);
      onUpdate(res.data);
      setTestimonialData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" color="white">
          Testimonial Change
        </Typography>
        <TextField
          label="Heading"
          name="heading"
          value={testimonialData.heading}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="dense"
          className={classes.field}
        />
        <TextField
          label="Testimonial"
          name="text"
          value={testimonialData.text}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          minRows="4"
          margin="dense"
          className={classes.field}
        />
        <TextField
          label="Name"
          name="name"
          value={testimonialData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="dense"
          className={classes.field}
        />
        <TextField
          label="Position"
          name="position"
          value={testimonialData.position}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="dense"
          className={classes.field}
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
};

export default TestimonialEditView;
