import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  selectWrapper: {
    position: "relative",
    width: "100%",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      width: "2rem",
      height: "100%",
      pointerEvents: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& svg": {
      color: "#333",
      position: "absolute",
      right: 5,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    },
  },
  select: {
    appearance: "none",
    padding: "0.5rem 2rem 0.5rem 0.5rem",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "Roboto",
    color: "#333",
    backgroundColor: "#F5F5F5",
    backgroundImage: "none",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    cursor: "pointer",
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
  option: {
    fontSize: "0.9rem !important",
    fontWeight: 500,
    fontFamily: "Roboto",
    backgroundColor: "#F5F5F5",
    color: "#333",
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const Dropdown = ({ value, options, onChange }) => {
  const classes = useStyles();

  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={classes.selectWrapper}>
      <span style={{ paddingRight: 16 }}>Rows per page:</span>
      <select
        className={classes.select}
        value={value}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option} value={option} className={classes.option}>
            <span style={{ fontSize: "2rem" }}>{option}</span>
          </option>
        ))}
      </select>
      <ExpandMoreIcon />
    </div>
  );
};

export default Dropdown;
