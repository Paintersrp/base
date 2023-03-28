import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "./TextEditor";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import PageContainer from "../../Elements/Layout/PageContainer";
import BaseContent from "../../Elements/Base/BaseContent";
import { getCookie } from "../../../Utils";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import PublishIcon from "@mui/icons-material/Publish";
import StyledButton from "../../Elements/Buttons/StyledButton";
import FormField from "../../Elements/Fields/FormField";
import PublishDialog from "./PublishModal";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      marginBottom: 5,
      marginTop: 5,
      width: "25ch",
    },
  },
  title: {
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "50%",
    height: 200,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 8,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const CreateUpdateArticle = ({}) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    formData.content = content;

    axios
      .post("http://localhost:8000/api/articles/", formData, config)
      .then((res) => {
        dispatch({ type: "ALERT_SUCCESS", message: "Article Created" });
        setTimeout(() => {
          navigate(`/articles`);
        }, 250);
      })
      .catch((err) => console.error(err));
  };

  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 250);
  };

  return (
    <PageContainer backgroundColor="#F5F5F5" page_name="News">
      <BaseContent
        maxWidth={1000}
        pt={4}
        pb={4}
        boxShadow={1}
        header={
          <>
            <div style={{ display: "flex" }}>
              <Tooltip
                title={`Go Back`}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleBackButtonClick}
                  className={classes.backButton}
                >
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </div>
            <Typography variant="h3" component="h1" className={classes.title}>
              Create Article
            </Typography>
          </>
        }
      >
        <div style={{ width: "100%", display: "flex" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <QuillEditor value={content} onChange={handleContentChange} />
            </div>
          </form>
        </div>
        <div className={classes.buttonContainer}>
          <StyledButton
            minWidth={0}
            onClick={handleOpen}
            color="primary"
            buttonText={"Finalize"}
            endIcon={<ArrowRightIcon />}
            noHover
          />
        </div>
      </BaseContent>
      <PublishDialog
        open={open}
        onClose={handleClose}
        onPublish={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </PageContainer>
  );
};

export default CreateUpdateArticle;
