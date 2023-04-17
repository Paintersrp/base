import React from "react";

export function mapSwitch(value) {
  const justificationMap = {
    l: "flex-start",
    fs: "flex-start",
    start: "flex-start",
    "flex-start": "flex-start",
    r: "flex-end",
    fe: "flex-end",
    right: "flex-end",
    "flex-end": "flex-end",
    c: "center",
    center: "center",
    sb: "space-between",
    "space-between": "space-between",
  };

  return justificationMap[value] || null;
}

function Flexer({
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  j: justifyContent = "flex-start",
  a: alignItems = "center",
  fd: flexDirection = "row",
  w: width = "100%",
  children,
  style,
  className,
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: width,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: mapSwitch(justifyContent),
        alignItems: mapSwitch(alignItems),
      }}
    >
      {children}
    </div>
  );
}

export default Flexer;
