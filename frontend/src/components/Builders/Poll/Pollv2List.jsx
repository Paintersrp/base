import React, { useEffect, useState } from "react";
import Flexer from "../../Elements/Layout/Container/Flexer";
import HelpText from "../Parts/Text/HelpText";

export default function Pollv2List({
  style,
  options,
  type,
  vote,
  handleChange,
}) {
  return (
    <>
      {style === "None" && (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            listStyle: "none",
          }}
        >
          {options.map((option) => {
            return (
              <>
                <Flexer w="100%" fd="row" a="center">
                  <li>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <input
                        name="vote"
                        onChange={handleChange}
                        type={type === "Single" ? "radio" : "checkbox"}
                        value={option}
                      />
                      <HelpText>{option}</HelpText>
                    </span>
                  </li>
                </Flexer>
              </>
            );
          })}
        </ul>
      )}
      {style === "Numbered" && (
        <form>
          <ol
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {options.map((option) => {
              return (
                <Flexer w="100%" fd="row" a="center">
                  <li>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <input
                        name="vote"
                        onChange={handleChange}
                        type={type === "Single" ? "radio" : "checkbox"}
                        value={option}
                      />
                      <HelpText>{option}</HelpText>
                    </span>
                  </li>
                </Flexer>
              );
            })}
          </ol>
        </form>
      )}
      {style === "Alphabetical" && (
        <form>
          <ol
            type="A"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {options.map((option) => {
              return (
                <Flexer>
                  <li>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <input
                        name="vote"
                        onChange={handleChange}
                        type={type === "Single" ? "radio" : "checkbox"}
                        value={option}
                      />
                      <HelpText>{option}</HelpText>
                    </span>
                  </li>
                </Flexer>
              );
            })}
          </ol>
        </form>
      )}
    </>
  );
}
