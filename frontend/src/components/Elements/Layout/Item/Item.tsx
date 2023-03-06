import React from "react";
import "./Item.css";

interface Props {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  justify?: string;
  align?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Item: React.FC<Props> = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  justify = "center",
  align = "center",
  children,
  style = {},
}) => {
  const getBasis = (
    breakpointValue: number | undefined,
    defaultValue: number
  ): string => {
    const value =
      breakpointValue !== undefined ? breakpointValue : defaultValue;
    return value * 8.333333333333333 + "%";
  };

  const itemBasis = {
    "--item-basis-xs": getBasis(xs, 12),
    "--item-basis-sm": getBasis(sm, xs),
    "--item-basis-md": getBasis(md, sm || xs),
    "--item-basis-lg": getBasis(lg, md || sm || xs),
    "--item-basis-xl": getBasis(xl, lg || md || sm || xs),
  } as React.CSSProperties;

  const itemStyle = {
    ...itemBasis,
    display: justify ? "flex" : "",
    justifyContent: justify ? justify : "",
    alignContent: align ? align : "",
    ...style,
  };

  return (
    <div className="item" style={itemStyle}>
      {children}
    </div>
  );
};

export default Item;

// const itemBasis = {
//   "--item-basis-xs": xs * 8.333333333333333 + "%",
//   "--item-basis-sm": sm
//     ? sm * 8.333333333333333 + "%"
//     : xs * 8.333333333333333 + "%",
//   "--item-basis-md": md
//     ? md * 8.333333333333333 + "%"
//     : sm
//     ? sm * 8.333333333333333 + "%"
//     : xs * 8.333333333333333 + "%",
//   "--item-basis-lg": lg
//     ? lg * 8.333333333333333 + "%"
//     : md
//     ? md * 8.333333333333333 + "%"
//     : sm
//     ? sm * 8.333333333333333 + "%"
//     : xs * 8.333333333333333 + "%",
//   "--item-basis-xl": xl
//     ? xl * 8.333333333333333 + "%"
//     : lg
//     ? lg * 8.333333333333333 + "%"
//     : md
//     ? md * 8.333333333333333 + "%"
//     : sm
//     ? sm * 8.333333333333333 + "%"
//     : xs * 8.333333333333333 + "%",
// } as React.CSSProperties;
