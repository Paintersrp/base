import React from "react";
import { makeStyles, Select, MenuItem, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    width: "100%",
    backgroundColor: theme.palette.background.default,
    // backgroundColor: "#FAFAFA",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
    borderRadius: 16,
  },
  activeLink: {
    color: "#007BFF",
    marginRight: theme.spacing(4),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  label: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
  },
  value: {
    color: "#718096",
    fontWeight: 500,
    wordBreak: "break-word",
    marginBottom: theme.spacing(1),
  },
  messageText: {
    wordBreak: "break-word",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#2D3748",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    color: "#2D3748",
  },
  subtitle: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(3),
  },
  details: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(0),
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#4A5568",
    margin: theme.spacing(3, 0, 0, 0),
  },
  sectionDescription: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(2),
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
  resumeLink: {
    color: theme.palette.info.light,
  },
  select: {
    width: "100%",
    marginTop: 4,
    height: "40px",
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
}));

const StatusChanger = ({
  value,
  originalValue,
  handleSubmit,
  handleChange,
  options,
  name,
  save,
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Select
        name={name}
        displayEmpty
        variant="standard"
        margin="dense"
        value={value}
        style={{
          minWidth: "70%",
          padding: 0,
          color: "#718096",
        }}
        onChange={handleChange}
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

          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem value={option.value}>{option.display}</MenuItem>
        ))}
      </Select>
      {value !== originalValue && save ? (
        <Button
          size="small"
          color="textSecondary"
          style={{ marginLeft: 4 }}
          onClick={handleSubmit}
        >
          SAVE
        </Button>
      ) : null}
    </form>
  );
};

export default StatusChanger;
