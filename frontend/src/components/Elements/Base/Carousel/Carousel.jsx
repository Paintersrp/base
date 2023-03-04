import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Carousel.css";

const Carousel = ({
  children,
  autoplay,
  interval,
  transition,
  showArrows,
  showIndicators,
  showThumbnails,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef();

  const numItems = React.Children.count(children);

  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        handleNextClick();
      }, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [autoplay, interval]);

  const handlePrevClick = () => {
    if (!transitioning) {
      const index = activeIndex === 0 ? numItems - 1 : activeIndex - 1;
      setActiveIndex(index);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    }
  };

  const handleNextClick = () => {
    if (!transitioning) {
      const index = activeIndex === numItems - 1 ? 0 : activeIndex + 1;
      setActiveIndex(index);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    }
  };

  const handleIndicatorClick = (index) => {
    if (!transitioning) {
      setActiveIndex(index);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    }
  };

  const handleThumbnailClick = (index) => {
    if (!transitioning) {
      setActiveIndex(index);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 600);
    }
  };

  const getTransitionClass = () => {
    if (transition === "fade") {
      return transitioning ? "Carousel__item--fade-transition" : "";
    } else {
      return transitioning ? "Carousel__item--slide-transition" : "";
    }
  };

  const getItemStyle = (index) => {
    const translateX = 100 * (index - activeIndex);
    return {
      transform: `translateX(${translateX}%)`,
    };
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        {React.Children.map(children, (child, index) => (
          <div
            className={`Carousel__item ${getTransitionClass()}`}
            style={getItemStyle(index)}
          >
            {child}
          </div>
        ))}
      </div>
      {showArrows && (
        <div className="Carousel__arrows">
          <div
            className="Carousel__arrow Carousel__arrow--prev"
            onClick={handlePrevClick}
          >
            &lt;
          </div>
          <div
            className="Carousel__arrow Carousel__arrow--next"
            onClick={handleNextClick}
          >
            &gt;
          </div>
        </div>
      )}
      {showIndicators && (
        <div className="Carousel__indicators">
          {React.Children.map(children, (child, index) => (
            <div
              className={`Carousel__indicator ${
                index === activeIndex ? "Carousel__indicator--active" : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      )}
      {showThumbnails && (
        <div className="Carousel__thumbnails">
          {React.Children.map(children, (child, index) => (
            <div
              className={`Carousel__thumbnail ${
                index === activeIndex ? "Carousel__thumbnail--active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              {React.cloneElement(child, {
                className: "Carousel__thumbnail-image",
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  transition: PropTypes.oneOf(["slide", "fade"]),
  showArrows: PropTypes.bool,
  showIndicators: PropTypes.bool,
  showThumbnails: PropTypes.bool,
};

Carousel.defaultProps = {
  autoplay: false,
  interval: 3000,
  transition: "slide",
  showArrows: true,
  showIndicators: true,
  showThumbnails: false,
};

export default Carousel;
