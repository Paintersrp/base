import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  selectWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
  },
  selectLabel: {
    paddingRight: "16px",
    fontSize: "14px",
    color: "#555",
  },
  selectedOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    appearance: "none",
    padding: theme.spacing(0, 1, 0, 1),
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Roboto",
    color: "#333",
    backgroundColor: "#F5F5F5",
    backgroundImage: "none",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
  menuWrapper: {
    position: "absolute",
    top: 23,
    right: 0,
    zIndex: 1,
    minWidth: 58,
    backgroundColor: "#F5F5F5",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "8rem",
  },
  menuItem: {
    width: "100%",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Roboto",
    backgroundColor: "#F5F5F5",
    color: "#333",
    borderBottom: "1px solid #dddddd",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
  },
}));

const Dropdown = ({ value, options, onChange, label }) => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (option) => {
    onChange(option);
    setMenuOpen(false);
  };

  return (
    <div className={classes.selectWrapper}>
      <span style={{ display: "flex", alignItems: "center" }}>
        Rows to Display:
      </span>
      <label className={classes.selectLabel}>{label}</label>
      <div className={classes.select} onClick={handleMenuClick}>
        <div className={classes.selectedOption}>
          {value} <ArrowDropDownIcon />
        </div>
      </div>
      {menuOpen && (
        <div className={classes.menuWrapper}>
          {options.map((option) => (
            <div
              key={option}
              className={classes.menuItem}
              onClick={() => handleMenuItemClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
