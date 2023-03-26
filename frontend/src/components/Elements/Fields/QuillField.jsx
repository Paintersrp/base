import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 0,
    padding: 0,
    width: "100%",
    "& .ql-editor": {
      width: "100%",
      margin: "0 0 10px 0",
    },
    "& .ql-toolbar": {
      background: "#F5F5F5",
    },
    "& .ql-container": {
      position: "static",
    },
  },
  sizeSmall: {
    marginBottom: 0,
    padding: 0,

    "& .ql-editor": {
      width: "100%",
      margin: "0 0 10px 0",
    },
    "& .ql-toolbar": {
      background: "#F5F5F5",
    },
    "& .ql-container": {
      position: "static",
      height: 200,
    },
  },
  sizeMedium: {
    marginBottom: 0,
    padding: 0,
    "& .ql-editor": {
      width: "100%",
      margin: "0 0 10px 0",
      background: "#F5F5F5",
    },
    "& .ql-toolbar": {
      background: "#F5F5F5",
    },
    "& .ql-container": {
      position: "static",
      height: 400,
    },
  },
  sizeLarge: {
    marginBottom: 0,
    padding: 0,
    "& .ql-editor": {
      width: "100%",
      margin: "0 0 10px 0",
    },
    "& .ql-toolbar": {
      background: "#F5F5F5",
    },
    "& .ql-container": {
      position: "static",
      height: 600,
    },
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.25, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const QuillField = ({
  fieldName,
  value,
  onChange,
  modules,
  formats,
  size = "small",
  helpText,
}) => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    setContent(value);
  });

  const handleChange = (e) => {
    setContent(value);
    onChange(value);
  };

  const handleAdminChange = (fieldValue) => {
    setContent(fieldValue);
    onChange(fieldName, fieldValue);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.helpText}>
        {helpText || "Placeholder Help Text"}
      </Typography>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={fieldName ? handleAdminChange : handleChange}
        modules={modules}
        formats={formats}
        className={
          size === "small"
            ? classes.sizeSmall
            : size === "medium"
            ? classes.sizeMedium
            : size === "large"
            ? classes.sizeLarge
            : classes.root
        }
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
