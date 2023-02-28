import React from "react";
import "./Flexbox.css";

const Flexbox = ({
  children,
  justify = "start",
  align = "center",
  direction = "row",
  className,
}) => {
  const getSpanClass = (span, breakpoint) => `span-${breakpoint}-${span}`;
  const childJustifyClass = `justify-${justify}`;
  const childAlignClass = `align-${align}`;
  const childDirectionClass = `direction-${direction}`;

  return (
    <div
      className={`flexbox ${childJustifyClass} ${className ? className : ""}`}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const { xs, sm, md, lg, xl, ...rest } = child.props;
        const xsSpanClass = getSpanClass(xs, "xs");
        const smSpanClass = sm && getSpanClass(sm, "sm");
        const mdSpanClass = md && getSpanClass(md, "md");
        const lgSpanClass = lg && getSpanClass(lg, "lg");
        const xlSpanClass = xl && getSpanClass(xl, "xl");

        return React.cloneElement(child, {
          ...rest,
          className: `flexbox-child ${childJustifyClass} ${childAlignClass} ${childDirectionClass} ${
            xsSpanClass ? xsSpanClass : ""
          } ${smSpanClass ? smSpanClass : ""} ${
            mdSpanClass ? mdSpanClass : ""
          } ${lgSpanClass ? lgSpanClass : ""} ${
            xlSpanClass ? xlSpanClass : ""
          } ${child.props.className ? child.props.className : ""}`,
        });
      })}
    </div>
  );
};

export default Flexbox;
