import React from "react";
import { Button } from "@material-ui/core";

export default function DeleteButton({
  onClick,
  editState,
  color = "black",
  position = "center",
  mt = 15,
  mb = 0,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: position,
        marginTop: mt,
        marginBottom: mb,
        width: "100%",
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
