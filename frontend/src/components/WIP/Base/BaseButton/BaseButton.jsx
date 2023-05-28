import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./styles.css";

const sizeSwitch = (size) => {
  switch (size) {
    case "t":
    case "tiny":
      return "0.2rem";
    case "sm":
    case "small":
      return "0.35rem";
    case "md":
    case "medium":
      return "0.5rem";
    case "lg":
    case "large":
      return "0.75rem";
    default:
      return "0.35rem";
  }
};
const colorSwitch = (color) => {
  switch (color) {
    case "primary":
      return "button-primary";
    case "secondary":
      return "button-secondary";
    case "error":
      return "button-error";
    case "success":
      return "button-success";
    default:
      return "button-primary";
  }
};

const BaseButton = ({
  size = "sm",
  color = "primary",
  children,
  onClick,
  className = undefined,
  style,
}) => {
  return (
    <button
      className={clsx(colorSwitch(color), className)}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: sizeSwitch(size),
      }}
    >
      {children}
    </button>
  );
};

export default BaseButton;
