import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Grid, Paper, Card, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  paper: {
    minWidth: 330,
    backgroundColor: "#000000",
    width: "100%",
  },
  card: {
    width: "100%",
    paddingBottom: "56.25%",
  },
  media: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
  },
  button: {
    marginTop: "auto",
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailGallery: {
    maxHeight: "80px",
    minWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[7],
      border: "0.5px solid gold",
    },
  },
}));

const PortfolioCarousel = ({ items }) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [isManualClick, setIsManualClick] = useState(false);

  const handleClick = (index) => {
    setAutoPlayEnabled(false);
    setIsManualClick(true);
    setActiveIndex(index);
  };

  const handleChange = (index) => {
    if (!isManualClick) return;
    setAutoPlayEnabled(false);
    setTimeout(() => {
      setAutoPlayEnabled(true);
      setIsManualClick(false);
    }, 250);
  };

  return (
    <div className={classes.carousel}>
      <Paper elevation={0} className={classes.paper}>
        <Carousel
          navButtonsAlwaysVisible={false}
          animation="fade"
          autoPlay={autoPlayEnabled}
          onChange={handleChange}
          interval={5000}
          timeout={500}
          swipe={true}
          index={activeIndex}
          pauseOnHover={true}
          indicators={false}
        >
          {items.map((item, index) => (
            <div>
              <Card className={classes.card} key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={classes.media}
                />
              </Card>
              <div className={classes.btnContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  href={item.buttonLink}
                  className={classes.button}
                >
                  {item.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
        <div className={classes.thumbnailGallery}>
          <Grid container spacing={0}>
            {items.map((item, index) => (
              <Grid item xs={2} style={{ maxHeight: "80px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={classes.thumbnail}
                  key={index}
                  onClick={() => handleClick(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default PortfolioCarousel;
