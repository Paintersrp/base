import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
    padding: 0,
    marginLeft: 5,
    "& .ql-editor": {
      width: "100%",
      margin: "0 0 10px 0",
    },
    "& .ql-toolbar": {
      backgroundColor: "white",
    },
    "& .ql-container": {},
  },
});

const QuillField = ({ value, onChange, modules, formats, size }) => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    setContent(value);
    editorHeight();
  });

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  const editorHeight = () => {
    switch (size) {
      case "small":
        return "200px";
      case "medium":
        return "400px";
      case "large":
        return "600px";
      default:
        return "600px";
    }
  };

  return (
    <div className={classes.root}>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{
          height:
            size === "small" ? "200px" : size === "medium" ? "400px" : "600px",
        }}
      />
    </div>
  );
};

QuillField.defaultProps = {
  modules: {
    toolbar: [
      [{ header: [3, 4, 5, 6, true] }],
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

export default QuillField;
