import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles({
  root: {
    "& .ql-editor": {
      height: "400px",
    },
    "& .ql-toolbar": {
      backgroundColor: "white",
    },
    "& .ql-container": {},
  },
});

const QuillEditor = ({ value, onChange, modules, formats }) => {
  const classes = useStyles();
  const [content, setContent] = useState("tits");
  const quillRef = useRef(null);

  useEffect(() => {
    setContent(value);
  });

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  return (
    <div className={classes.root}>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

QuillEditor.defaultProps = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "font",
    "align",
    "size",
    "color",
    "background",
    "clean",
  ],
  theme: "snow",
  bounds: "#root",
};

export default QuillEditor;
