import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box, Button, Paper } from "@material-ui/core";
import { FaCheck, FaHeart, FaStar, FaRocket } from "react-icons/fa";
import TitleBlock from "../../../../Elements/TextBlocks/TitleBlock/TitleBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    minHeight: 550,
  },
  featureContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    "&:not(:last-of-type)": {
      borderBottom: "1px solid white",
    },
  },
  featureText: {
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "Roboto",
    letterSpacing: 0.25,
    textAlign: "left",
    marginLeft: 10,
  },
  btnCta: {
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    minWidth: 350,
  },
  paper: {
    backgroundColor: "#1C1C1C",
    color: "white",
    padding: 30,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    itemAlign: "center",
  },
}));

const getFeatures = () => {
  return [
    {
      text: "Our platform offers a user-friendly interface that makes it easy for you to navigate and find the information you need, with a simple and intuitive design that makes it easy to use.",
      icon: <FaCheck size={20} color="gold" style={{ marginRight: "10px" }} />,
    },
    {
      text: "We pride ourselves on providing exceptional customer service, with dedicated support team available 24/7 to assist you with any questions or concerns you may have.",
      icon: <FaHeart size={20} color="gold" style={{ marginRight: "10px" }} />,
    },
    {
      text: "Our platform offers a wide range of features that are tailored to meet the needs of our customers, including advanced analytics, reporting, and data visualization tools.",
      icon: <FaStar size={20} color="gold" style={{ marginRight: "10px" }} />,
    },
    {
      text: "Our platform is designed to be highly scalable and efficient, ensuring that it can handle large amounts of data and traffic without any issues.",
      icon: <FaRocket size={20} color="gold" style={{ marginRight: "10px" }} />,
    },
  ];
};

const Feature = ({ text, icon }) => {
  const classes = useStyles();
  return (
    <Box className={classes.featureContainer}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={2}
          sm={1}
          alignItems="center"
          justifyContent="center"
          className={classes.iconContainer}
        >
          {icon}
        </Grid>
        <Grid item xs={10} sm={11}>
          <Typography variant="body1" className={classes.featureText}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function FeatureCTA() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} md={8}>
          <Paper elevation={9} className={classes.paper}>
            <TitleBlock
              subtitle="Advanced Features"
              title="Web Design"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, vel enim a deleniti, eaque fugiat asperiores tempore temporibus similique veritatis eos libero reiciendis iste tempora totam at facere? Laudantium atque incidunt nam porro. Molestias asperiores corporis exercitationem deleniti aliquam et!"
              alignment="Left"
            />
            {getFeatures().map((feature) => (
              <Feature
                key={feature.text}
                text={feature.text}
                icon={feature.icon}
              />
            ))}
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={classes.btnCta}
                size="medium"
                color="primary"
              >
                Learn More
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
