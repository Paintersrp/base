import React from "react";
import { Button, CardActions } from "@material-ui/core";
import StyledButton from "./StyledButton";

export default function UpdateButton({ color = "black", mt = 0, mb = 0 }) {
  return (
    <CardActions
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: mt,
        marginBottom: mb,
        width: "100%",
      }}
    >
      <StyledButton
        type="submit"
        buttonText={"Update"}
        minWidth="0"
        size="small"
      />
      {/* <Button
        variant="outlined"
        type="submit"
        style={{
          width: 50,
          color: color,
          borderColor: "grey",
          height: 25,
          fontSize: "0.75rem",
        }}
      >
        Update
      </Button> */}
    </CardActions>
  );
}
