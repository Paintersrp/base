import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ContactButtons from "../../Contact/Contact/ContactButtons";
import Social from "../../Contact/Social/Social";
import StyledButton from "../../Elements/Buttons/StyledButton";
import BaseForm from "../../Elements/Base/BaseForm";
import HeroBlock from "../../Elements/TextBlocks/HeroBlock/HeroBlock";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import HeroBlockEdit from "../../Elements/TextBlocks/HeroBlock/HeroBlockEdit";

const useStyles = makeStyles((theme) => ({
  overlay: {
    padding: 20,
    marginTop: 80,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 60,
    },
  },
  container: {
    height: "100%",
    background: `url(https://source.unsplash.com/801x601/?service) no-repeat center center fixed`,
    backgroundSize: "cover",
    maxWidth: "100%",
    minHeight: 700,
    borderRadius: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  formField: {
    "& .MuiOutlinedInput-root": {
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
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
}));

function Hero({ contactData, form = true }) {
  const classes = useStyles();
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/heroblock/main/")
        .then((response) => {
          setHeroData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroData(updatedHeroBlock);
    setEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container flex className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.overlay}>
          {!editing ? (
            <HeroBlock
              title={heroData.title}
              heading={heroData.heading}
              text={heroData.text}
              btnText={heroData.buttonText}
            />
          ) : (
            <HeroBlockEdit
              heroBlock={heroData}
              onUpdate={updateHeroBlock}
              handleCancel={() => setEditing(!editing)}
            />
          )}
          {!editing && auth.is_superuser ? (
            <>
              <EditDeleteButtonMenu
                editClick={() => setEditing(!editing)}
                hideDelete
                placement="bottom"
                position="center"
                finalColor="white"
              />
            </>
          ) : null}
          <Grid item xs={12} md={12} className={classes.contactContainer}>
            <ContactButtons contactData={contactData[0]} />
            <Grid container flex justifyContent="center">
              <Social contactData={contactData[0]} color="light" />
            </Grid>
          </Grid>
        </div>
      </Grid>

      {form ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <BaseForm
            title="Ready to take the first step?"
            body="Fill out the form below and one of our experts will get in touch
        with you to schedule a consultation."
            handleSubmit={handleSubmit}
            boxShadow={2}
          >
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Full Name"
                variant="outlined"
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Email"
                variant="outlined"
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Phone"
                variant="outlined"
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <StyledButton buttonText="Get in touch" />
            </Grid>
          </BaseForm>
        </div>
      ) : null}
    </Grid>
  );
}

export default Hero;
