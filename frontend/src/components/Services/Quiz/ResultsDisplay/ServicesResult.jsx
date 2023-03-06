import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SelectedService from "./SelectedService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(3),
    backgroundColor: theme.palette.background.light,
  },
  item: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.light,
  },
}));

const ServicesResult = ({ recommendedId, others }) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = others.findIndex((service) => service.id === recommendedId);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [recommendedId, others]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Grid container className={classes.root} justifyContent="center">
      {others.map((service, index) => (
        <Grid
          item
          className={classes.item}
          style={{
            transform:
              index === activeIndex
                ? "translateX(0%) scale(1)"
                : "translateX(0%) scale(0.95)",
            transition: "all 0.3s ease",
          }}
          onClick={() => handleClick(index)}
        >
          <SelectedService
            key={service.id}
            service={service}
            active={index === activeIndex}
            recommendedId={recommendedId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesResult;
