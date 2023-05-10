import React from "react";
import { AddCircleOutline } from "@material-ui/icons";
import StyledButton from "../../../Elements/Buttons/StyledButton";

export default function AddButton({ addFunc, label, disabled = false }) {
  return (
    <StyledButton
      maxWidth={70}
      minWidth={70}
      maxHeight={25}
      margin="0px 8px 0px 8px"
      size="small"
      color="primary"
      startIcon={<AddCircleOutline />}
      onClick={addFunc}
      buttonText={`Add ${label}`}
      disabled={disabled}
    />
  );
}
