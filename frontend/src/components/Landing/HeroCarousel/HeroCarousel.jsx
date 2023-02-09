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

export default function HeroCarousel({ items, setItems }) {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [heroblock, setHeroblock] = useState({});
  const [data, setData] = useState({
    title: "",
    heading: "",
    text: "",
    buttonText: "",
  });
  const auth = useSelector((state) => state.auth);

  const updateHeroBlock = (updatedHeroBlock) => {
    setHeroblock(updatedHeroBlock);
    setData(updatedHeroBlock);
    setEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/heroblock/")
        .then((response) => {
          setData(response.data);
          console.log(data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const updateCarousel = (updateCarousel) => {
    setEditing(false);
    setItems(updateCarousel);
  };

  return (
    <Box className={classes.root}>
      <Container style={{ maxWidth: "95%" }} className={classes.gridContainer}>
        <Grid container className={classes.grid}>
          <Slide in={true} direction="right" timeout={1000}>
            <Grid item xs={12} md={6} className={classes.gridItemLeft}>
              {!editing ? (
                <HeroBlock
                  title={data.title}
                  heading={data.heading}
                  text={data.text}
                  btnText={data.buttonText}
                  btnLink="/about"
                />
              ) : (
                <HeroBlockEdit
                  heroblock={data}
                  updateHeroBlock={updateHeroBlock}
                />
              )}
              {auth.is_superuser ? (
                <Button onClick={() => setEditing(!editing)}>
                  {editing ? "Cancel" : "Edit"}
                </Button>
              ) : null}
              {/* <Grid item xs={12} md={12} className={classes.contactContainer}>
                <ContactButtons />
                <SocialSection />
              </Grid> */}
            </Grid>
          </Slide>

          <Grid item xs={12} md={6}>
            <SlideOnScroll from="right">
              {!editing ? (
                <CarouselX items={items} />
              ) : (
                <CarouselEdit items={items} updateCarousel={updateCarousel} />
              )}
            </SlideOnScroll>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
