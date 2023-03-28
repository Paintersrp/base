import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  label: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: 4,
    color: theme.palette.primary.main,
  },
  formControl: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,

    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.action.hoverLight,
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {},
  },
  labelContainer: {
    marginBottom: theme.spacing(1),
  },
}));

const ImageInput = ({
  xs,
  md,
  handleChange,
  newImage,
  newImageName,
  width = "75%",
}) => {
  const classes = useStyles();

  const handleSelectFile = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <FormControl
        margin="dense"
        fullWidth
        className={classes.formControl}
        style={{ width: width }}
      >
        <Box
          style={{ display: "flex", justifyContent: "center" }}
          onClick={handleSelectFile}
        >
          <FormControlLabel
            control={
              <IconButton
                size="small"
                aria-label="upload image"
                component="span"
                onClick={handleSelectFile}
                className={classes.icon}
              >
                <CloudUpload />
              </IconButton>
            }
            label={
              <Typography
                className={classes.label}
                variant="body1"
                component="span"
              >
                {!newImage ? "Select Image" : newImageName}
              </Typography>
            }
            labelPlacement="end"
          />
        </Box>
        <input
          accept="image/*"
          className={classes.input}
          id="file-input"
          name="image"
          type="file"
          onChange={handleChange}
        />
      </FormControl>
    </div>
  );
};

export default ImageInput;
