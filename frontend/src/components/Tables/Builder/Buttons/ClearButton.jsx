import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import StyledButton from "../../../Elements/Buttons/StyledButton";

export default function ClearButton({ clearFunc }) {
  return (
    <StyledButton
      maxWidth={65}
      minWidth={65}
      maxHeight={25}
      margin={0}
      size="small"
      color="#f44336"
      startIcon={<ClearIcon />}
      onClick={clearFunc}
      buttonText={`Clear`}
      noHover
    />
  );
}

{
  /* <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this FAQ?"
      /> */
}
