import React from "react";
import Text from "../../../Elements/Layout/Text/Text";

export default function HelpText({
  children,
  a = "l",
  mt = 8,
  mb = 4,
  mr = 0,
  ml = 0,
  style,
}) {
  return (
    <Text
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      a={a}
      style={{ ...style, color: "#626262", padding: 0 }}
    >
      {children}
    </Text>
  );
}
