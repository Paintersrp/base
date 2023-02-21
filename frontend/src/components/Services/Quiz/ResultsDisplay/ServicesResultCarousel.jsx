import React from "react";
import SelectedService from "./SelectedService";
import BaseCarousel from "../../../Elements/Base/BaseCarousel";

const ServicesResultCarousel = ({ recommended, others }) => {
  return (
    <BaseCarousel title="Services">
      {[recommended, ...others].map((service, index) => (
        <SelectedService
          key={index}
          service={service}
          active={true}
          recommendedId={recommended.id}
        />
      ))}
    </BaseCarousel>
  );
};

export default ServicesResultCarousel;
