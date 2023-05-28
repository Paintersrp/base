import Flexer from "../../Elements/Layout/Container/Flexer";
import HelpText from "../Parts/Text/HelpText";

export default function Pollv2Tile({ style, options, type }) {
  const handleVote = (e) => {};

  const onSubmit = (e) => {};

  return (
    <>
      {style === "Rectangle" && (
        <form onSubmit={onSubmit} action="">
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                          onChange={handleVote}
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
        </form>
      )}
      {style === "Square" && (
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              border: "1px solid blue",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {options.map((option) => {
              return (
                <Flexer w="100%" fd="row" a="center">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <input
                      name="vote"
                      onChange={handleVote}
                      type={type === "Single" ? "radio" : "checkbox"}
                      value={option}
                    />
                    <button name="vote"></button>
                    <HelpText>{option}</HelpText>
                  </span>
                </Flexer>
              );
            })}
          </div>
        </form>
      )}
    </>
  );
}
