import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { FaHelicopter, FaDonate, FaTruckPickup } from "react-icons/fa";

const featureData = [
  {
    icon: <FaHelicopter size={40} />,
    title: "Lifetime Support",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
  },
  {
    icon: <FaDonate size={40} />,
    title: "Unlimited Donations",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
  },
  {
    icon: <FaTruckPickup size={40} />,
    title: "Instant Delivery",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...",
  },
];

const Feature = ({ title, text, icon }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant="subtitle1" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary" align="center">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function BetterFeatures() {
  return (
    <Box p={4}>
      <Grid container spacing={3}>
        {featureData.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Feature {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
