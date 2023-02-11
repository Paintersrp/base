import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Card } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
}));

const ImageCarousel = ({ items }) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [isManualClick, setIsManualClick] = useState(false);

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
            </div>
          ))}
        </Carousel>
      </Paper>
    </div>
  );
};

export default ImageCarousel;
