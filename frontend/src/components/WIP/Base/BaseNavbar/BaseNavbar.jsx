import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

const BaseNavbar = ({ children, position, side, color, className, style }) => {
  const navbarStyles = {
    position: position,
    [side]: -1,
    ...style,
  };

  const classes = classNames("nav-top", `bg-${color}-m`, className);

  return (
    <nav className={classes} style={navbarStyles}>
      {children}
    </nav>
  );
};

BaseNavbar.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["fixed", "absolute"]),
  side: PropTypes.oneOf(["top", "bottom"]),
  color: PropTypes.oneOf(["primary", "secondary", "error", "success"]),
};

BaseNavbar.defaultProps = {
  position: "fixed",
  side: "top",
  color: "primary",
  className: "",
  style: null,
};

export default BaseNavbar;
