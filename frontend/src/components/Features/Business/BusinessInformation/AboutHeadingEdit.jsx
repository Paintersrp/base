import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {
  Button,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import getCookie from "../../../../lib/Utils/getCookies";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: 5,
  },
  image: {
    minHeight: 100,
    minWidth: 200,
    width: "100%",
    paddingBottom: "56.25%",
  },
  field: {
    "& .MuiOutlinedInput-root": {
      fontSize: "0.85rem",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "black",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
}));

const AboutHeadingEdit = ({ aboutBlock, onUpdate }) => {
  const classes = useStyles();
  const [state, setState] = useState({ ...aboutBlock });
  const [image, setImage] = useState(state.image);

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
    let formData = new FormData();
    formData.append("title", state.title);

    if (image.name) {
      formData.append("image", image, image.name);
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/aboutblock/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/aboutblock/`);
      onUpdate(res.data);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            width: "100%",
          }}
        >
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "75%",
          }}
        >
          <Typography
            variant="h5"
            color="black"
            style={{ textAlign: "center" }}
          >
            About Block Change
          </Typography>
          <TextField
            variant="outlined"
            label="Title"
            name="title"
            value={state.title}
            onChange={handleChange}
            margin="dense"
            className={classes.field}
          />
          <Typography style={{ color: "black" }}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Typography>
          <CardContent>
            {state.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                  <CardMedia
                    className={classes.image}
                    image={`${state.image}/`}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </form>
  );
};

export default AboutHeadingEdit;
