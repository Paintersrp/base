import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    display: "inline-block",
    position: "absolute",
    cursor: "pointer",
    userSelect: "none",
    padding: theme.spacing(0, 0, 0, 0),
    width: 50,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "0.85rem",
    fontWeight: 500,
    textAlign: "center",
    transition: "background-color 0.2s ease-in-out",
  },
  dropdown: {
    border: "1px solid black",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  option: {
    display: "block",
    padding: theme.spacing(0, 1, 0, 1),
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  display: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end",
  },
  value: {
    marginLeft: theme.spacing(1),
  },
}));

const Dropdown = ({ value, options, onChange }) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={`${classes.root}`} onClick={handleClick}>
      <div className={classes.display}>
        <div className={classes.value}>{value}</div>
        <div className={classes.icon}>
          <ArrowDropDownIcon />
        </div>
      </div>
      {isOpen && (
        <div className={classes.dropdown}>
          {options.map((option) => (
            <div
              key={option}
              className={classes.option}
              onClick={() => handleOptionClick(option)}
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
