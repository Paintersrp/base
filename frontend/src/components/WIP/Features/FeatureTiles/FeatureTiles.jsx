import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Slide, Button } from "@material-ui/core";
import "./Features.css";
import { SlideOnScroll } from "../../../Elements/Animations/IntoView/Slide/SlideViewPort";
import {
  FaLaptopCode,
  FaCloud,
  FaMobileAlt,
  FaRocket,
  FaLock,
  FaCog,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Tile from "./Tile";

const Icon = ({ icon }) => {
  switch (icon) {
    case "FaLaptopCode":
      return <FaLaptopCode />;
    case "FaCloud":
      return <FaCloud />;
    case "FaMobileAlt":
      return <FaMobileAlt />;
    case "FaRocket":
      return <FaRocket />;
    case "FaLock":
      return <FaLock />;
    case "FaCog":
      return <FaCog />;
    case "FaLightbulb":
      return <FaLightbulb />;
    case "FaStar":
      return <FaStar />;
    default:
      return <></>;
  }
};

export default function FeatureTiles() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/tiles/")
      .then((response) => {
        console.log(response.data);
        setTiles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="features-root padder">
      <Slide in={true} direction="up" timeout={1000}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {tiles.map((tile, index) => (
            <Tile tile={tile} index={index} />
          ))}
        </Grid>
      </Slide>
    </div>
  );
}
