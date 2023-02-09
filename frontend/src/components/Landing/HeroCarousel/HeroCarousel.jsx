import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Box, Slide, Button } from "@material-ui/core";
import { SlideOnScroll } from "../../Animations/IntoView/Slide/SlideViewPort";
import HeroBlock from "../../Elements/TextBlocks/HeroBlock/HeroBlock";
import CarouselX from "../../Elements/Images/Carousel/ImageCarousel";
import ContactButtons from "../../About/Contact/Contact/ContactButtons";
import Social from "../../About/Contact/Social/Social";
import { useEffect } from "react";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { useState } from "react";
import HeroBlockEdit from "../../Elements/TextBlocks/HeroBlock/HeroBlockEdit";
import { useSelector } from "react-redux";
import CarouselEdit from "./CarouselEdit";
import EditButton from "../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(12),
    position: "relative",
  },
  gridContainer: {
    fontFamily: "Poppins",
    zIndex: 10,
    position: "relative",
  },
  grid: {
    fontFamily: "Poppins",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  gridItemLeft: {
    padding: "20px 20px 20px 0px",
    fontFamily: "Poppins",
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function HeroCarousel({ items, setItems, contactData }) {
  const classes = useStyles();
  const [editHero, setEditHero] = useState(false);
  const [editCarousel, setEditCarousel] = useState(false);
  const [heroData, setHeroData] = useState({
    title: "",
    heading: "",
    text: "",
    buttonText: "",
  });
  const [contacts, setContacts] = useState();
  const auth = useSelector((state) => state.auth);

  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroData(updatedHeroBlock);
    setEditHero(false);
  };

  useEffect(() => {
    setContacts(contactData);
    const fetchData = async () => {
      axiosInstance
        .get("/heroblock/")
        .then((response) => {
          setHeroData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const updateCarousel = (updateCarousel) => {
    setEditCarousel(false);
    setItems(updateCarousel);
  };

  return (
    <Box className={classes.root}>
      <Container style={{ maxWidth: "95%" }} className={classes.gridContainer}>
        <Grid container className={classes.grid}>
          <Slide in={true} direction="right" timeout={1000}>
            <Grid item xs={12} md={6} className={classes.gridItemLeft}>
              {!editHero ? (
                <HeroBlock
                  title={heroData.title}
                  heading={heroData.heading}
                  text={heroData.text}
                  btnText={heroData.buttonText}
                  btnLink="/about"
                />
              ) : (
                <HeroBlockEdit
                  heroblock={heroData}
                  updateHeroBlock={updateHeroBlock}
                />
              )}
              {auth.is_superuser ? (
                <div style={{ marginTop: 20 }}>
                  <EditButton
                    onClick={() => setEditHero(!editHero)}
                    editState={editHero}
                    color="white"
                  />
                </div>
              ) : null}
              <Grid item xs={12} md={12} className={classes.contactContainer}>
                {contacts ? <ContactButtons contactData={contacts} /> : null}
                {contacts ? <Social contactData={contacts} /> : null}
              </Grid>
            </Grid>
          </Slide>

          <Grid item xs={12} md={6}>
            <SlideOnScroll from="right">
              {!editCarousel ? (
                <CarouselX items={items} />
              ) : (
                <CarouselEdit items={items} updateCarousel={updateCarousel} />
              )}
            </SlideOnScroll>
            {auth.is_superuser ? (
              <div style={{ marginTop: 20 }}>
                <EditButton
                  onClick={() => setEditCarousel(!editCarousel)}
                  editState={editCarousel}
                  color="white"
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
