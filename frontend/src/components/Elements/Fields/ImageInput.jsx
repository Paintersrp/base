import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import StyledButton from "../Buttons/StyledButton";

const useStyles = makeStyles(() => ({
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    marginLeft: 70,
    display: "none",
  },
  field: {
    margin: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      margin: 0,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,
      alignItems: "center",

      "& fieldset": {
        borderColor: "black",
        alignItems: "center",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      alignItems: "center",
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
      fontSize: "0.8rem",
      letterSpacing: 0.5,
    },
    "& input": {
      color: "black",
    },
  },
}));

const ImageInput = ({ handleChange, handleClick, newImage, newImageName }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <div style={{ width: "65%" }}>
        <input
          accept="image/*"
          className={classes.input}
          id="file-input"
          name="image"
          type="file"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          className={classes.field}
          id="file-textfield"
          label={!newImage ? "Select Image" : newImageName}
          variant="outlined"
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <StyledButton
                  buttonText="Upload"
                  onClick={handleClick}
                  minWidth={60}
                  noHover
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Grid>
  );
};

export default ImageInput;
