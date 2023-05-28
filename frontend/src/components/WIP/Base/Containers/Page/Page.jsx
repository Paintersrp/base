import React from "react";
import PropTypes from "prop-types";
import Text from "../../../../Elements/Layout/Text/Text";
import "../styles.css";

const Page = ({
  children,
  header,
  headerAlign,
  headerType,
  backgroundColor = "#F5F5F5",
}) => {
  return (
    <div className="page-root" style={{ backgroundColor: backgroundColor }}>
      {header ? (
        <Text t={headerType} a={headerAlign}>
          {header}
        </Text>
      ) : null}
      <div className="page-content">{children}</div>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  backgroundColor: PropTypes.string,
  headerType: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  headerAlign: PropTypes.oneOf(["l", "r", "c", "left", "right", "center"]),
};

Page.defaultProps = {
  children: null,
  header: null,
  backgroundColor: "#F5F5F5",
  headerType: "h1",
  headerAlign: "center",
};

export default Page;
