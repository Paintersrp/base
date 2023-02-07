import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  FaShirtsinbulk,
  FaSocks,
  FaShoePrints,
  FaWineBottle,
  FaGift,
  FaLaptop,
  FaWallet,
  FaFootballBall,
} from "react-icons/fa";
import Button from "@material-ui/core/Button";
import LinkTile from "./LinkTile";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#242424",
  },
  outerPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    margin: theme.spacing(1),
    backgroundColor: "#242424",
    color: "white",
    maxWidth: 1400,
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: "#1C1C1C",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const categories = [
  { name: "Clothing", icon: FaShirtsinbulk, link: "/clothing" },
  { name: "Accessories", icon: FaSocks, link: "/accessories" },
  { name: "Shoes", icon: FaShoePrints, link: "/shoes" },
  { name: "Titty Milk", icon: FaWineBottle, link: "/wine" },
  { name: "Gifts", icon: FaGift, link: "/gifts" },
  { name: "Electronics", icon: FaLaptop, link: "/electronics" },
  { name: "Sporting Goods", icon: FaFootballBall, link: "/sports" },
  { name: "Wallets", icon: FaWallet, link: "/wallet" },
];

export default function CategoryTiles() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Paper className={classes.outerPaper} elevation={9}>
        <TitleBlock
          subtitle="Categories"
          title="Explore Our Products"
          alignment="Center"
          showDivider={false}
        />
        <div className={classes.root}>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.name}>
                <LinkTile category={category} />
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 10 }}>
            <Button variant="contained" className={classes.button}>
              View All
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
