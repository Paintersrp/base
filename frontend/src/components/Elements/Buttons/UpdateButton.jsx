import React from "react";
import { Button, CardActions } from "@material-ui/core";

export default function UpdateButton() {
  return (
    <CardActions
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: 10,
        paddingTop: 0,
        marginTop: 0,
      }}
    >
      <Button
        variant="outlined"
        type="submit"
        style={{
          width: 50,
          color: "black",
          borderColor: "grey",
          height: 25,
          fontSize: "0.75rem",
        }}
      >
        Update
      </Button>
    </CardActions>
  );
}
