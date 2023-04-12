import React from "react";
import { Save } from "@material-ui/icons";
import StyledButton from "../../../Elements/Buttons/StyledButton";

export default function SaveButton({ label, submitFunc }) {
  return (
    <StyledButton
      maxWidth={label ? 130 : 85}
      minWidth={label ? 130 : 85}
      maxHeight={25}
      margin={0}
      size="small"
      color="primary"
      startIcon={<Save />}
      onClick={submitFunc}
      buttonText={label ? `Save ${label}` : "Save"}
      noHover
    />
  );
}
