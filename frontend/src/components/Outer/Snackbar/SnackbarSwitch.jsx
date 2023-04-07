import React from "react";
import AdvancedSnackbar from "../../Elements/Snackbars/Snackbar";

const SnackbarSwitch = ({
  component,
  message,
  type,
  open,
  onClose,
  position,
}) => {
  switch (component) {
    case "Standard":
      return (
        <AdvancedSnackbar
          message={message}
          type={type}
          open={open}
          onClose={onClose}
          position={position}
        />
      );
    case "Minimal":
      return (
        <AdvancedSnackbar
          message={message}
          type={type}
          open={open}
          onClose={onClose}
          position={position}
        />
      );
    default:
      return <div>Unknown component type: {component}</div>;
  }
};

export default SnackbarSwitch;
