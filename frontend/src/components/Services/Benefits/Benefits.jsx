import { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from "@material-ui/core";
import benefitsData from "./benefitsData";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(8, 0),
  },
  benefit: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0),
    },
  },
  benefitTitle: {
    fontWeight: 600,
    color: theme.palette.primary.black,
    marginBottom: theme.spacing(2),
  },
  benefitDescription: {
    color: "#6B6B6B",
    marginBottom: theme.spacing(2),
    minHeight: 100,
  },
  benefitButton: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    display: "flex",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
  benefitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "100%",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    color: theme.palette.primary.dark,
    fontSize: "2rem",
  },
}));

const Benefit = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  minHeight,
  id,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  return (
    <SlideIntoViewPort
      addition={900}
      animationDuration={1}
      onScreenPercentage={0.9}
    >
      <Card className={classes.benefit}>
        <CardContent>
          <Container disableGutters display="flex">
            <Grid item xs={12}>
              <div className={classes.icon}>{icon}</div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.benefitTitle}>
                {title}
              </Typography>
            </Grid>
          </Container>
          <Typography
            variant="body2"
            className={classes.benefitDescription}
            style={{ minHeight: minHeight }}
          >
            {description}
          </Typography>

          {buttonText && (
            <Container
              disableGutters
              style={{ display: "flex", justifyContent: "center" }}
            >
              <StyledButton size="small" buttonText={buttonText} />
            </Container>
          )}
        </CardContent>
      </Card>
    </SlideIntoViewPort>
  );
};

const Benefits = () => {
  const classes = useStyles();
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
  const maxHeightRef = useRef(null);

  useEffect(() => {
    const maxHeight = maxHeightRef.current.offsetHeight;
    setMaxDescriptionHeight(maxHeight);
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Why Choose Us?
        </Typography>
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            We believe that our commitment to quality and customer satisfaction
            sets us apart from our competitors. Here are a few of the benefits
            of working with us
          </Typography>
        </Container>
        <div className={classes.benefitContainer}>
          <Grid container>
            {benefitsData.map((benefit, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                className={classes.gridItem}
                key={benefit.title}
              >
                <Benefit
                  id={benefit.id}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  maxHeight={maxDescriptionHeight}
                  buttonText={benefit.buttonText ? benefit.buttonText : null}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ visibility: "hidden" }} ref={maxHeightRef}>
          {benefitsData
            .reduce((max, { description }) => {
              return description.length > max.length ? description : max;
            }, "")
            .split(" ")
            .map((word) => (
              <span>{word} </span>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
