import React, { useState } from "react";
import "../styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Text from "../../../../Elements/Layout/Text/Text";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import BaseIconButton from "../../BaseIconButton/BaseIconButton";
import Collapser from "../../Collapser/Collapser";
import { shadowSwitch } from "../../../../../utils/styleSwitches/styleSwitches";

function Content({
  header,
  subheader,
  children,
  maxWidth,
  boxShadow = 0,
  pad: padding = 3,
  pl: paddingLeft = 0,
  pr: paddingRight = 0,
  pt: paddingTop = 0,
  pb: paddingBottom = 0,
  br: borderRadius = 1,
  b: background = "#F5F5F5",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd = "column",
  collapse = false,
  divider = false,
  headerAlign = "center",
  headerVar = "h3",
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        padding: 0,
        margin: 0,
        paddingRight: paddingRight * 8,
        paddingLeft: paddingLeft * 8,
        paddingTop: paddingTop * 8,
        paddingBottom: paddingBottom * 8,
        background: background,
      }}
    >
      <div
        style={{
          maxWidth: maxWidth,
          padding: padding * 8,
          boxShadow: shadowSwitch(boxShadow),
          borderRadius: borderRadius * 8,
          background: background,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Flexer j="c">
          <Flexer
            a="c"
            style={{
              marginLeft: collapse ? (headerAlign === "left" ? 0 : 26) : 0,
              textAlign: headerAlign,
            }}
          >
            {header && (
              <Text t={headerVar} className="header" a={headerAlign}>
                {header}
              </Text>
            )}
          </Flexer>

          {collapse && (
            <Flexer j="fe" a="c" w={26}>
              <BaseIconButton
                className={`expandButton ${open ? "rotate" : ""}`}
                size="tiny"
                onClick={() => setOpen(!open)}
              >
                <ExpandMoreIcon />
              </BaseIconButton>
            </Flexer>
          )}
        </Flexer>
        {divider && <hr className="hr-divider" />}

        <Collapser isOpen={open}>
          {subheader && (
            <Text t="body2" className="subheader">
              {subheader}
            </Text>
          )}

          <Flexer j={justifyChildren} a={alignChildren} fd={fd}>
            {children}
          </Flexer>
        </Collapser>
      </div>
    </div>
  );
}

export default Content;
