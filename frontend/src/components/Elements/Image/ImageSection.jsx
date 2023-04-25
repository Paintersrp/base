import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";
import Flexer from "../Layout/Container/Flexer";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

export function ImageSection({ image, width }) {
  const classes = useStyles();

  return (
    <Flexer j="c" style={{ minHeight: 500 }}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          style={{ width: width }}
        />
      </Card>
    </Flexer>
  );
}
