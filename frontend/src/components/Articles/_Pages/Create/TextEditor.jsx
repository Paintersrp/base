import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quillStyle.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    width: "100%",
    minHeight: "550px",
    "& .ql-toolbar": {
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "#f7f7f7",
    },
    "& .ql-container": {
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    "& .ql-editor": {
      minHeight: "500px",
      padding: "16px",
    },
    "& .ql-editor p": {
      fontSize: "18px",
      margin: "0 0 16px 0",
    },
    "& .ql-editor h1": {
      fontSize: "32px",
      margin: "32px 0 16px 0",
    },
    "& .ql-editor h2": {
      fontSize: "24px",
      margin: "32px 0 16px 0",
    },
    "& .ql-editor h3": {
      fontSize: "20px",
      margin: "32px 0 16px 0",
    },
    "& .ql-editor h4": {
      fontSize: "18px",
      margin: "32px 0 16px 0",
    },
    "& .ql-editor blockquote": {
      borderLeft: "4px solid #ccc",
      padding: "16px",
      margin: "32px 0",
    },
    "& .ql-align-center": {
      textAlign: "center",
    },
  },
  media: {
    maxWidth: 100,
  },
}));

const QuillEditor = ({ value, onChange, modules, formats }) => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
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
        render={(props) => {
          const newProps = { ...props };
          console.log("props:", props.value);
          if (props.node && props.node.tagName === "img") {
            newProps.node.classList.add("quill-image");
          }
          console.log(newProps);
          return newProps.node;
        }}
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
      ["image"],
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
