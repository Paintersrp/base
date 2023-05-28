import React from "react";
import SubjectIcon from "@mui/icons-material/Subject";
import BaseIconButton from "../../../Base/BaseIconButton/BaseIconButton";

const MenuButton = ({
  size = "md",
  color = "primary",
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  onClick,
  className = undefined,
  style = undefined,
}) => {
  return (
    <BaseIconButton
      size={size}
      color={color}
      mt={marginTop}
      mb={marginBottom}
      pl={paddingLeft}
      pr={paddingRight}
      onClick={onClick}
      className={className}
      style={style}
    >
      <SubjectIcon />
    </BaseIconButton>
  );
};

export default MenuButton;
