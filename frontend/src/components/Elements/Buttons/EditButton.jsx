import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontFamily: "Roboto",
    fontSize: ".9rem",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
    color: theme.palette.primary.contrastText,
    minWidth: 65,
    textAlign: "center",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

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
  const classes = useStyles();

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
