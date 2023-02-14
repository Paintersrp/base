import React from "react";
import { Button } from "@material-ui/core";

export default function DeleteButton({
  onClick,
  color = "black",
  position = "center",
  mt = 15,
  mb = 0,
  mr = 0,
  ml = 0,
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
        Delete
      </Button>
    </div>
  );
}
