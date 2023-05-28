import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./styles.css";

const sizeSwitch = (size) => {
  switch (size) {
    case "t":
    case "tiny":
      return 24;
    case "sm":
    case "small":
      return 32;
    case "md":
    case "medium":
      return 36;
    case "lg":
    case "large":
      return 40;
    default:
      return 36;
  }
};

const BaseIconButton = ({
  size = "lg",
  color = "primary",
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  children,
  onClick,
  className = undefined,
  style = undefined,
}) => {
  const [sizeValue, setSizeValue] = useState();

  useEffect(() => {
    setSizeValue(sizeSwitch(size));
  }, [size]);

  return (
    <button
      className={clsx(
        color === "primary" ? "collapse-button" : "collapse-button-secondary",
        className
      )}
      onClick={onClick}
      style={{
        ...style,
        width: sizeValue,
        height: sizeValue,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        paddingRight: paddingRight || 0,
      }}
    >
      {children}
    </button>
  );
};

export default BaseIconButton;
