import { MenuItem } from "@material-ui/core";
import React from "react";
import BasicSelect from "../../Elements/Fields/BasicSelect";
import Flexer from "../../Elements/Layout/Container/Flexer";
import HelpText from "../Parts/Text/HelpText";

export default function MappedSelectField({
  value,
  name,
  onChange,
  optionsArray,
  helpText,
  helpPosition = "top",
  variant = "outlined",
  onFocus,
  onBlur,
  inputRef,
}) {
  return (
    <Flexer fd="column">
      <HelpText
        mb={helpPosition === "top" ? 4 : 0}
        mt={helpPosition === "top" ? 8 : 4}
        style={{ order: helpPosition === "top" ? 1 : 2 }}
      >
        {helpText}
      </HelpText>
      <BasicSelect
        style={{
          order: helpPosition === "top" ? 2 : 1,
          marginTop: helpPosition === "top" ? 0 : 8,
        }}
        name={name}
        value={value}
        variant={variant}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        inputRef={inputRef}
      >
        <MenuItem value={helpText} disabled>
          {helpText}
        </MenuItem>
        {optionsArray.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BasicSelect>
    </Flexer>
  );
}
