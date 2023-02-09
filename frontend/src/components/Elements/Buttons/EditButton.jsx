import React from "react";
import { Button } from "@material-ui/core";

export default function EditButton({ onEdit, editState }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        width: "100%",
      }}
    >
      <Button
        variant="outlined"
        style={{
          width: 50,
          color: "black",
          borderColor: "grey",
          height: 25,
          fontSize: "0.75rem",
        }}
        onClick={() => onEdit()}
      >
        {editState ? "Cancel" : "Edit"}
      </Button>
    </div>
  );
}
