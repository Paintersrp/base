import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fileInputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    justifyContent: "center",
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    color: "black",
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  fileInputLabelDownloadable: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  fileName: {
    marginLeft: theme.spacing(1),
    color: "inherit",
    textDecoration: "underline",
  },
  fileNoName: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
  },
}));

const FileType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  const classes = useStyles();
  const [fileName, setFileName] = React.useState(
    formData[fieldName] ? formData[fieldName] : null
  );
  const handleFileChange = (e) => {
    handleInputChange(e);
    setFileName(e.target.files[0].name);
  };

  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 16,
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <div className={classes.fileInputContainer}>
        {formData[fieldName] instanceof File ? (
          <a
            href={URL.createObjectURL(formData[fieldName])}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.fileInputLabelDownloadable}
          >
            <Typography variant="body1" className={classes.fileName}>
              <em>{fileName}</em>
            </Typography>
          </a>
        ) : (
          <>
            {formData[fieldName] ? (
              <a
                href={formData[fieldName]}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.fileInputLabelDownloadable}
              >
                <Typography variant="body2" className={classes.fileName}>
                  <em>{formData[fieldName]}</em>
                </Typography>
              </a>
            ) : (
              <Typography variant="body2" className={classes.fileNoName}>
                No Resume Uploaded
              </Typography>
            )}
          </>
        )}
        <Input
          type="file"
          id={`${fieldName}-input`}
          name={fieldName}
          inputProps={{ accept: ".pdf,.docx" }}
          onChange={handleFileChange}
          className={classes.fileInput}
        />
        <label
          htmlFor={`${fieldName}-input`}
          className={classes.fileInputLabel}
        >
          <AttachFileIcon fontSize="small" />
          <Typography variant="body2">
            {formData[fieldName]
              ? `Change ${verboseName} File`
              : `Upload ${verboseName} File`}
          </Typography>
        </label>
      </div>
    </Grid>
  );
};

export default FileType;
