import React, { useState } from "react";
import StyledButton from "../../Elements/Buttons/StyledButton";
import RichTextEditor from "./Editor";
import RichTextEditorToolbar from "./Toolbar";

function MultiParagraphEditor({}) {
  const [paragraphs, setParagraphs] = useState([""]);
  const [selectedEditor, setSelectedEditor] = useState(null);

  const onSave = () => {
    console.log(paragraphs);
  };

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const handleParagraphChange = (event, index) => {
    const newParagraphs = [...paragraphs];
    console.log(newParagraphs);
    newParagraphs[index] = event.target.innerHTML;
    setParagraphs(newParagraphs);
  };

  const handleParagraphSave = (index) => {
    onSave(paragraphs[index]);
  };

  const handleKeyDown = (event, index) => {
    console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleEditorClick = (index) => {
    setSelectedEditor(index);
  };

  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {paragraphs.map((paragraph, index) => (
        <div key={index} style={{ maxWidth: 500 }}>
          {selectedEditor === index && (
            <RichTextEditorToolbar
              onToggleBold={() => document.execCommand("bold", false, null)}
              onToggleItalic={() => document.execCommand("italic", false, null)}
              onToggleUnderline={() =>
                document.execCommand("underline", false, null)
              }
              onToggleBulletPoints={() =>
                document.execCommand("insertUnorderedList", false, null)
              }
              onToggleNumberedPoints={() =>
                document.execCommand("insertOrderedList", false, null)
              }
              onToggleBlockquote={() =>
                document.execCommand("formatBlock", false, "<blockquote>")
              }
            />
          )}
          <div onClick={() => handleEditorClick(index)}>
            <RichTextEditor
              value={paragraph}
              onChange={(event) => handleParagraphChange(event, index)}
              onSave={() => handleParagraphSave(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          </div>
        </div>
      ))}
      <StyledButton
        buttonText="Add Paragraph"
        minWidth={0}
        onClick={handleAddParagraph}
      />
    </div>
  );
}

export default MultiParagraphEditor;
