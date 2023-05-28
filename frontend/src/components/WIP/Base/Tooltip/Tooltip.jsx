import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Tooltip.css";

const Tooltip = ({ children, text, position, arrow }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    console.log("entered");
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const tooltipPositionClass = `tooltip-content tooltip-content--${position} ${
    arrow ? `arrow arrow--${position}` : ""
  }`;

  return (
    <div className="tooltip-container">
      <span
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      <div
        className={tooltipPositionClass}
        style={{ visibility: isTooltipVisible ? "visible" : "hidden" }}
      >
        {text}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
  arrow: PropTypes.bool,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

Tooltip.defaultProps = {
  position: "bottom",
  arrow: false,
};

export default Tooltip;
