import React, { useState } from "react";
import HelpText from "../../../Builders/Parts/Text/HelpText";
import Flexer from "../../../Elements/Layout/Container/Flexer";

const BaseInput = ({
  id,
  name,
  value,
  onChange,
  multiline = false,
  rows = 1,
  type = "text",
  required = false,
  error = false,
  helpText = "",
  helpPosition = "top",
  placeholder,
  style,
  className,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <Flexer fd="column">
      <HelpText
        mt={0}
        mb={0}
        // mb={helpPosition === "top" ? 0 : 0}
        // mt={helpPosition === "top" ? 0 : 0}
        style={{ order: helpPosition === "top" ? 1 : 2 }}
      >
        {helpText}
      </HelpText>
      <InputComponent
        className={`${className}`}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        type={type}
        error={error}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...style,
          minHeight: multiline ? 169.5 : null,
          order: helpPosition === "top" ? 2 : 1,
        }}
      />
    </Flexer>
  );
};

export default BaseInput;
