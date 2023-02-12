import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Box, Slide } from "@material-ui/core";
import { SlideOnScroll } from "../../Elements/Animations/IntoView/Slide/SlideViewPort";
import HeroBlock from "../../Elements/TextBlocks/HeroBlock/HeroBlock";
import ImageCarousel from "./ImageCarousel";
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
    backgroundColor: theme.palette.background.light,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
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
    color: theme.palette.background.dark,
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

export default function Hero({ items, setItems, contactData }) {
  const classes = useStyles();
  const [editHero, setEditHero] = useState(false);
  const [editCarousel, setEditCarousel] = useState(false);
  const [heroData, setHeroData] = useState({
    title: "",
    heading: "",
    text: "",
    buttonText: "",
  });
  const auth = useSelector((state) => state.auth);

  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroData(updatedHeroBlock);
    setEditHero(false);
  };

  useEffect(() => {
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
      <Container className={classes.gridContainer}>
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
                <div>
                  <div>
                    <HeroBlockEdit
                      heroblock={heroData}
                      updateHeroBlock={updateHeroBlock}
                    />
                  </div>
                </div>
              )}
              {auth.is_superuser ? (
                <div style={{ marginTop: 20 }}>
                  <EditButton
                    onClick={() => setEditHero(!editHero)}
                    editState={editHero}
                  />
                </div>
              ) : null}
              <Grid item xs={12} md={12} className={classes.contactContainer}>
                {contactData ? (
                  <ContactButtons contactData={contactData} />
                ) : null}
                {contactData ? (
                  <div>
                    <Social contactData={contactData} />
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Slide>
          <Grid item xs={12} md={6}>
            <SlideOnScroll from="right">
              {!editCarousel ? (
                <ImageCarousel items={items} />
              ) : (
                <CarouselEdit items={items} updateCarousel={updateCarousel} />
              )}
            </SlideOnScroll>
            {auth.is_superuser ? (
              <div style={{ marginTop: 20 }}>
                <EditButton
                  onClick={() => setEditCarousel(!editCarousel)}
                  editState={editCarousel}
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
