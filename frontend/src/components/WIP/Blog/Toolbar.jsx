// import React from "react";
// import { ToggleButton, ToggleButtonGroup } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
// import FormatBoldIcon from "@material-ui/icons/FormatBold";
// import FormatItalicIcon from "@material-ui/icons/FormatItalic";
// import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
// import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
// import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
// import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

// const useStyles = makeStyles(() => ({
//   buttonGroup: {
//     marginBottom: 8,
//     display: "flex",
//     justifyContent: "flex-start",
//   },
// }));

// function RichTextEditorToolbar({
//   onToggleBold,
//   onToggleItalic,
//   onToggleUnderline,
//   onToggleBulletPoints,
//   onToggleNumberedPoints,
//   onToggleBlockquote,
// }) {
//   const classes = useStyles();

//   return (
//     <ToggleButtonGroup
//       className={classes.buttonGroup}
//       size="small"
//       aria-label="text formatting"
//     >
//       <ToggleButton value="bold" onClick={onToggleBold}>
//         <FormatBoldIcon />
//       </ToggleButton>
//       <ToggleButton value="italic" onClick={onToggleItalic}>
//         <FormatItalicIcon />
//       </ToggleButton>
//       <ToggleButton value="underline" onClick={onToggleUnderline}>
//         <FormatUnderlinedIcon />
//       </ToggleButton>
//       <ToggleButton value="bullet-points" onClick={onToggleBulletPoints}>
//         <FormatListBulletedIcon />
//       </ToggleButton>
//       <ToggleButton value="numbered-points" onClick={onToggleNumberedPoints}>
//         <FormatListNumberedIcon />
//       </ToggleButton>
//       <ToggleButton value="blockquote" onClick={onToggleBlockquote}>
//         <FormatQuoteIcon />
//       </ToggleButton>
//     </ToggleButtonGroup>
//   );
// }

// export default RichTextEditorToolbar;

function RichTextEditorToolbar({ editorRef }) {
  const handleBoldClick = () => {
    document.execCommand("bold");
    editorRef.current.focus();
  };

  const handleItalicClick = () => {
    document.execCommand("italic");
    editorRef.current.focus();
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline");
    editorRef.current.focus();
  };

  const handleLinkClick = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      editorRef.current.focus();
    }
  };

  const handleOrderedListClick = () => {
    document.execCommand("insertOrderedList");
    editorRef.current.focus();
  };

  const handleUnorderedListClick = () => {
    document.execCommand("insertUnorderedList");
    editorRef.current.focus();
  };

  return (
    <div className="editor-toolbar">
      <button className="editor-toolbar-button" onClick={handleBoldClick}>
        <strong>B</strong>
      </button>
      <button className="editor-toolbar-button" onClick={handleItalicClick}>
        <em>I</em>
      </button>
      <button className="editor-toolbar-button" onClick={handleUnderlineClick}>
        <u>U</u>
      </button>
      <button className="editor-toolbar-button" onClick={handleLinkClick}>
        Link
      </button>
      <button
        className="editor-toolbar-button"
        onClick={handleOrderedListClick}
      >
        1.
      </button>
      <button
        className="editor-toolbar-button"
        onClick={handleUnorderedListClick}
      >
        •
      </button>
    </div>
  );
}

export default RichTextEditorToolbar;
