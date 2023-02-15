import React, { useState } from "react";
import {
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  IconButton,
  Checkbox,
  FormGroup,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SelectedService from "./SelectedService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ServicesResult = ({ recommended, others }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container flex justifyContent="center" style={{ maxWidth: 1200 }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h2" gutterBottom>
          Recommended Services
        </Typography>
      </Grid>
      <Grid container flex justifyContent="center">
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{
            order: isSmallScreen ? 0 : 1,
          }}
        >
          <SelectedService key={1} service={recommended} highlighted />
        </Grid>
        {others.map((service, index) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={{ order: index === 0 ? 0 : 2 }}
          >
            <SelectedService key={1} service={service} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ServicesResult;
