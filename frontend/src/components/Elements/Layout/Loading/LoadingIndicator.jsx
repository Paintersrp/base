import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./LoadingIndicator.css";
import PageContainer from "../PageContainer";

function LoadingIndicator({ size, color, className }) {
  const classes = classNames("loading-container", className);
  const [editing, setEditing] = useState(false);
  const spinnerClasses = classNames("loading-spinner", {
    [`loading-spinner--size-${size}`]: size,
    [`loading-spinner--color-${color}`]: color,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div className={spinnerClasses}></div>
    </div>
  );
}

LoadingIndicator.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  className: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  size: "medium",
  color: "primary",
};

export default LoadingIndicator;
