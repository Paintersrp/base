import React from "react";
import { Button } from "@material-ui/core";

export default function EditButton({
  onClick,
  editState,
  color = "black",
  position = "center",
  mt = 5,
  mb = 0,
  mr = 0,
  ml = 0,
  width = "inherit",
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: position,
        marginTop: mt,
        marginBottom: mb,
        marginRight: mr,
        marginLeft: ml,
        width: width,
      }}
    >
      <Button
        variant="outlined"
        style={{
          width: 50,
          color: color,
          borderColor: "grey",
          height: 25,
          fontSize: "0.75rem",
        }}
        onClick={onClick}
      >
        {editState ? "Cancel" : "Edit"}
      </Button>
    </div>
  );
}
