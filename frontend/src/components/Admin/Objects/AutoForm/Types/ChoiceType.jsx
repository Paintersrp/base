import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AutoFormDialog from "../AutoFormDialog";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../../../../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: 8,
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: "#F5F5F5",
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
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const ChoiceType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
  xsColumnCount,
  mdColumnCount,
  helpText,
  fieldMetadata,
  handleModalUpdate,
}) => {
  console.log(choices);
  console.log("fieldName", fieldName);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <Typography className={classes.helpText}>
        {helpText || verboseName}
      </Typography>
      <FormControl style={{ width: "100%" }}>
        <FormControlLabel
          style={{
            fontSize: "0.8rem",
            width: "100%",
            margin: 0,
            color: "black",
          }}
          control={
            <Select
              className={classes.select}
              variant="outlined"
              value={formData[fieldName]}
              onChange={handleInputChange}
              displayEmpty
              name={fieldName}
              margin="dense"
              style={{ minWidth: "100%", padding: 0 }}
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
                classes: {
                  paper: classes.menuPaper,
                },
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select {verboseName}</em>
              </MenuItem>
              {Object.entries(
                fieldName === "content" ? choices : choices[0]
              ).map(([key, value]) => {
                if (fieldName === "content" && !value.model_name) {
                  return null;
                }

                return (
                  <MenuItem key={key} value={value.value}>
                    <span style={{ color: "black" }}>
                      {fieldName === "content"
                        ? value.model_name
                        : value.display}
                    </span>
                  </MenuItem>
                );
              })}
            </Select>
          }
        />
      </FormControl>
      {fieldName === "content" && (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <StyledButton
              noHover
              buttonText="Create Data Object"
              onClick={handleOpen}
            />
          </div>
          {formData[fieldName] && (
            <AutoFormDialog
              url={choices.find((item) => item.value === formData[fieldName])}
              open={open}
              handleClose={handleClose}
              formData={formData}
              handleModalUpdate={handleModalUpdate}
            />
          )}
        </>
      )}
    </Grid>
  );
};

export default ChoiceType;
