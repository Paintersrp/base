import React from "react";
import { Save } from "@material-ui/icons";
import StyledButton from "../../../Elements/Buttons/StyledButton";

export default function SaveButton({ label, submitFunc }) {
  return (
    <StyledButton
      maxWidth={130}
      minWidth={130}
      maxHeight={25}
      margin={0}
      size="small"
      color="primary"
      startIcon={<Save />}
      onClick={submitFunc}
      buttonText={`Save ${label}`}
    />
  );
}
