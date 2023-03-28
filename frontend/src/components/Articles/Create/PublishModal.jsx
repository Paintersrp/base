import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import PublishIcon from "@material-ui/icons/Publish";
import FormField from "../../Elements/Fields/FormField";
import SelectField from "../../Elements/Fields/SelectField";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import StyledButton from "../../Elements/Buttons/StyledButton";
import ImageInput from "../../Elements/Fields/ImageInput";

const useStyles = makeStyles((theme) => ({
  thumbnailContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  thumbnailImage: {
    width: 250,
    height: 150,
    objectFit: "cover",
    borderRadius: theme.spacing(1),
  },
  formControl: {
    minWidth: 120,
    marginRight: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
  button: {
    marginLeft: "auto",
  },
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
  paper: {
    background: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      margin: 16,
      width: "100%",
    },
  },
}));

const PublishDialog = ({ open, onClose, onPublish, formData, setFormData }) => {
  const classes = useStyles();
  const fileInputRef = useRef();
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [tags, setTags] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axiosInstance
      .get("/tags/")
      .then((response) => {
        setTags(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? e.target.files[0]
          : value,
    }));
  };

  const handleThumbnailImageChange = (event) => {
    formData.image = event.target.files[0];
    setThumbnailImage(event.target.files[0]);
  };

  const handlePublishClick = (event) => {
    onPublish(event);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      classes={{ paper: classes.paper }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 0px 0px 16px",
        }}
      >
        <Typography component="h1" variant="h5">
          Finalize Publishing
        </Typography>
        {onClose ? (
          <div>
            <IconButton
              aria-label="close"
              onClick={onClose}
              className={classes.iconButton}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Thumbnail Image
            </Typography>

            <div className={classes.thumbnailContainer}>
              {thumbnailImage ? (
                <img
                  src={URL.createObjectURL(thumbnailImage)}
                  alt="Thumbnail"
                  className={classes.thumbnailImage}
                />
              ) : (
                <Skeleton
                  variant="rect"
                  width={250}
                  height={150}
                  animation={null}
                />
              )}
            </div>
            <ImageInput
              xs={12}
              md={9}
              handleChange={handleThumbnailImageChange}
              handleClick={() => fileInputRef.current.click()}
              newImage={null}
              newImageName={null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ marginRight: 0, width: "100%" }}>
                <Typography className={classes.helpText}>
                  Give the Post a Title
                </Typography>
                <FormField
                  required
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  variant="standard"
                />
              </div>
            </div>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.helpText}
            >
              Topic / Category
            </Typography>
            <SelectField
              variant="standard"
              formData={formData}
              fieldName="tags"
              verboseName={"Topic"}
              handleInputChange={handleInputChange}
              choices={tags}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: 4 }}
            >
              *These changes will not effect how the content of your post looks,
              but they will effect how the post listing is displayed and
              filtered.
            </Typography>
          </Grid>
        </Grid>

        <DialogActions>
          <Button
            size="small"
            onClick={onClose}
            color="primary"
            style={{ borderRadius: 48, margin: 8 }}
          >
            Cancel
          </Button>
          <StyledButton
            onClick={handlePublishClick}
            color="primary"
            buttonText="Publish"
            minWidth={0}
            endIcon={<PublishIcon />}
            noHover
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default PublishDialog;
