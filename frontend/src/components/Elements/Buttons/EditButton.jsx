import React from "react";
import { Button } from "@material-ui/core";

export default function EditButton({ onClick, editState, color = "black" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
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
