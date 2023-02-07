import { Grid, useTheme, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock";
import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    width: "100%",
  },
  cardContainer: {
    justifyContent: "center",
    display: "flex",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
  },
  flexGrid: {
    justifyContent: "center",
    display: "flex",
    maxWidth: "100%",
  },
  paper: {
    backgroundColor: "#242424",
    width: "80%",
    padding: 20,
  },
}));

function FeaturedProducts({ products }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.flexGrid}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <TitleBlock
              subtitle="Featured Products"
              title="Check out our top picks"
              description="These products have been hand-selected by our team and are sure to
              impress."
              alignment="Center"
              showDivider={false}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: 10 }}
            >
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={product.id}
                  className={classes.cardContainer}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default FeaturedProducts;
