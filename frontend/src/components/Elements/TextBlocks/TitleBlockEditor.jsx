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
import { getCookie } from "../../../utils";

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

const TitleBlockEditor = ({ titleBlock, onUpdate }) => {
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
    let formData = new FormData();
    formData.append("name", state.name);
    formData.append("title", state.title);
    formData.append("subtitle", state.subtitle);
    formData.append("alignment", state.alignment);
    formData.append("show_divider", state.show_divider);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/titleblock/${titleBlock.name}/`,
        formData,
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
    <form onSubmit={handleSubmit} className={classes.fadeIn}>
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
            justifyContent: "center",
            width: "75%",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            style={{ textAlign: "center" }}
          >
            Title Block Change
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
          <TextField
            variant="outlined"
            label="Subtitle"
            name="subtitle"
            value={state.subtitle}
            onChange={handleChange}
            margin="dense"
            className={classes.field}
          />
          <FormControl className={classes.formControl}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  style={{ fontSize: "0.8rem" }}
                  control={
                    <Select
                      variant="outlined"
                      value={state.alignment}
                      onChange={handleChange}
                      displayEmpty
                      name="alignment"
                      margin="dense"
                      style={{ minWidth: 100, padding: 0, marginRight: 10 }}
                      className={classes.select}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                    </Select>
                  }
                  label="Alignment"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.show_divider}
                      onChange={handleSwitchChange}
                      name="show_divider"
                      value={state.show_divider}
                    />
                  }
                  label="Show Divider"
                />
              </Grid>
            </Grid>
          </FormControl>
          <Button variant="contained" type="submit" className={classes.button}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TitleBlockEditor;
