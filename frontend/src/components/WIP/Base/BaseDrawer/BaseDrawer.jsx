import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./BaseDrawer.css";

const BaseDrawer = ({
  open,
  onClose,
  side,
  variant,
  className,
  style,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (variant === "permanent") {
      setIsOpen(true);
    }
  }, [variant]);

  const handleClose = () => {
    onClose();
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsOpen(false);
    }
  };

  const hasOverlay = variant !== "permanent";

  const classes = classNames(
    "sidedrawer",
    `sidedrawer-${side}`,
    { "sidedrawer-open": isOpen },
    { "sidedrawer-has-overlay": hasOverlay },
    className
  );

  return (
    <>
      {hasOverlay && (
        <div
          className="sidedrawer-overlay"
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          onClick={handleClose}
        ></div>
      )}
      <div
        className={classes}
        style={{
          ...style,
          visibility: isOpen || variant === "permanent" ? "visible" : "hidden",
        }}
        // onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </>
  );
};

BaseDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  side: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  variant: PropTypes.oneOf(["standard", "persistent", "permanent"]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

BaseDrawer.defaultProps = {
  open: false,
  onClose: () => {},
  side: "left",
  variant: "standard",
  className: "",
  style: {},
  children: null,
};

export default BaseDrawer;
