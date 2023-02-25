import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { Grid, TextField } from "@material-ui/core";
import TagsInput from "../../Articles/Create/TagsInput";
import ImageEdit from "../../Elements/Fields/ImageEdit";
import ImageInput from "../../Elements/Fields/ImageInput";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { getCookie } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  card: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    width: "100%",
  },
  title: {
    padding: 5,
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: 40,
    display: "flex",
    justifyContent: "left",
  },
  input: {
    width: "100%",
  },
  body: {
    padding: "0 40px 0 40px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "0.9rem",
    letterSpacing: 0.5,
    lineHeight: 1.5,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    minHeight: 100,
    minWidth: 200,
    width: "100%",
    paddingBottom: "56.25%",
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.dark,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
  field: {
    marginBottom: theme.spacing(1.5),
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    "& input": {
      color: "black",
    },
  },
  multiline: {
    marginBottom: theme.spacing(1.5),
    width: "100%",
    "& .MuiOutlinedInput-inputMultiline": {
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 10,
      fontSize: "0.9rem",
      fontWeight: 50,
      width: "100%",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    "& input": {
      color: "black",
    },
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const PricingEdit = ({ plan, updatePlan, handleCancel }) => {
  const classes = useStyles();
  const [data, setData] = useState(plan);
  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(data.price);
  const [bestFor, setBestFor] = useState(data.bestFor);
  const [guarantee, setGuarantee] = useState(data.guarantee);
  const [image, setImage] = useState(data.image);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [features, setFeatures] = useState(
    data.features.map((tag) => tag.detail.trim())
  );
  console.log("sites: ", data.supported_sites);
  const [sites, setSites] = useState(
    data.supported_sites.map((tag) => tag.site.trim())
  );

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("best_for", bestFor);
    formData.append("guarantee", guarantee);
    formData.append("features", features.join(","));
    formData.append("supported_sites", sites.join(","));

    if (image.name) {
      formData.append("image", image, image.name);
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/pricingplan/${data.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/pricingplan/${data.id}/`
      );
      setData(res.data);
      updatePlan(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <>
      <div className={`${classes.root} ${classes.fadeIn}`}>
        <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            {data.image && (
              <>
                <Grid
                  container
                  flex
                  justifyContent="center"
                  style={{ marginTop: 16, padding: 8 }}
                >
                  {data.image && (
                    <ImageEdit
                      header="Current Image"
                      image={`${data.image}/`}
                    />
                  )}
                  {newImage ? (
                    <ImageEdit header="New Image" image={`${newImage}`} />
                  ) : null}
                </Grid>
                <ImageInput
                  handleChange={handleImageChange}
                  handleClick={handleClick}
                  newImage={newImage}
                  newImageName={newImageName}
                />
              </>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardContent style={{ width: "90%" }}>
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />

                <TagsInput
                  tags={features}
                  setTags={setFeatures}
                  label="Add Features"
                />
                <TextField
                  className={classes.multiline}
                  variant="outlined"
                  label="Best For"
                  value={bestFor}
                  onChange={(event) => setBestFor(event.target.value)}
                  multiline
                  minRows={4}
                />

                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Guarantee"
                  value={guarantee}
                  onChange={(event) => setGuarantee(event.target.value)}
                />
                <TagsInput tags={sites} setTags={setSites} label="Add Sites" />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <StyledButton
                    type="submit"
                    buttonText="Update"
                    minWidth="0"
                    size="small"
                  />
                  <StyledButton
                    buttonText="Cancel"
                    onClick={handleCancel}
                    minWidth="0"
                    size="small"
                  />
                </div>
              </CardContent>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default PricingEdit;
