import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
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
import { useState } from "react";
import { useSelector } from "react-redux";
import TileEdit from "./TileEdit";

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

export default function Tile({ tile, index }) {
  const [tileData, setTileData] = useState(tile);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateTile = (updateTile) => {
    setTileData(updateTile);
    setEditing(false);
  };

  return (
    <Grid
      key={tile.title}
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      justifyContent="center"
    >
      <SlideOnScroll direction="down">
        <div className="testing">
          <Paper className="feature-paper tile-bg">
            <div className="feature">
              {auth.is_superuser ? (
                <Button onClick={() => setEditing(!editing)}>
                  {editing ? "Cancel" : "Edit"}
                </Button>
              ) : null}
              {!editing ? (
                <div className="feature-icon">
                  <Icon icon={tileData.icon} />
                  <h1 className="feature-title">{tileData.title}</h1>
                  <h3 className="feature-subheader">{tileData.subheader}</h3>
                </div>
              ) : (
                <TileEdit
                  tile={tileData}
                  updateTile={updateTile}
                  index={index}
                />
              )}
            </div>
          </Paper>
        </div>
      </SlideOnScroll>
    </Grid>
  );
}
