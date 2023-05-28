import React from "react";
import PropTypes from "prop-types";
import "./Divider.css";

function Divider({
  mb: marginBottom,
  mt: marginTop,
  mr: marginRight,
  ml: marginLeft,
  color,
  thickness,
  vertical,
  dashed,
  text,
  textColor,
  textSize,
  textAlign,
}) {
  const dividerStyle = {
    marginBottom: `${marginBottom}px`,
    marginTop: `${marginTop}px`,
    marginRight: `${marginRight}px`,
    marginLeft: `${marginLeft}px`,
    borderTop: `${thickness}px ${dashed ? "dashed" : "solid"} ${color}`,
    borderLeft: vertical ? "none" : undefined,
    borderRight: vertical ? "none" : undefined,
    borderBottom: vertical ? undefined : "none",
    height: vertical ? "100%" : undefined,
  };

  const textStyle = {
    color: textColor,
    fontSize: `${textSize}px`,
    textAlign,
  };

  return (
    <div className={`divider ${vertical ? "vertical" : "horizontal"}`}>
      {!text && <hr style={dividerStyle} />}
      {text && (
        <>
          <hr style={dividerStyle} />
          <span className="divider-text" style={textStyle}>
            {text}
          </span>
          <hr style={dividerStyle} />
        </>
      )}
    </div>
  );
}

Divider.propTypes = {
  margin: PropTypes.number,
  color: PropTypes.string,
  thickness: PropTypes.number,
  vertical: PropTypes.bool,
  dashed: PropTypes.bool,
  text: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
};

Divider.defaultProps = {
  margin: 0,
  color: "#000000",
  thickness: 1,
  vertical: false,
  dashed: false,
  text: null,
  textColor: "#000000",
  textSize: 14,
  textAlign: "center",
};

export default Divider;
