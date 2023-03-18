import React, { useRef, useEffect } from "react";
import RichTextEditorToolbar from "./Toolbar";

function RichTextEditor({ value, onChange, onKeyDown, onSave }) {
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Check if the user is typing inside a list
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentNode = range.startContainer.parentNode;
        if (parentNode.tagName === "LI") {
          // Insert a new list item after the current one
          const newListElement = document.createElement("li");
          const textNode = document.createTextNode("\n");
          newListElement.appendChild(textNode);
          parentNode.parentNode.insertBefore(
            newListElement,
            parentNode.nextSibling
          );

          // Move the cursor to the new list item
          const newRange = document.createRange();
          newRange.setStart(newListElement, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);

          return;
        }
      }

      onSave();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleInput = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      dir="ltr"
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      suppressContentEditableWarning={true}
      dangerouslySetInnerHTML={{ __html: value }}
      style={{
        minWidth: 500,
        border: "1px solid darkgrey",
        marginBottom: 8,
        borderRadius: 0,
        boxShadow: "none",
      }}
    />
  );
}

export default RichTextEditor;
