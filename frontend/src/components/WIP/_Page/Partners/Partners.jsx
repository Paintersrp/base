import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock/TitleBlock";
import StyledButton from "../../../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
  },
  paper: {
    padding: 20,
    textAlign: "center",
    maxWidth: 1400,
    backgroundColor: theme.palette.background.light,
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  logo: {
    maxWidth: "100%",
    fontSize: "2.5rem",
    color: theme.palette.primary.main,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
  },
  cta: {
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
  subheading: {
    fontSize: "0.9rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    color: "#FDD017",
  },
  heading: {
    fontSize: "2rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    color: "white",
  },
}));

const partners = [
  { icon: FaTwitter, alt: "Twitter" },
  { icon: FaFacebook, alt: "Facebook" },
  { icon: FaInstagram, alt: "Instagram" },
  { icon: FaLinkedin, alt: "LinkedIn" },
  { icon: FaYoutube, alt: "Youtube" },
  { icon: FaGithub, alt: "Github" },
  { icon: FaStackOverflow, alt: "Stack Overflow" },
];

export default function Partners() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper className={classes.paper} elevation={0}>
          <TitleBlock
            subtitle="Our Partners"
            title="Trusted by Many"
            description="We are proud to work with some of the world's leading companies and
            organizations."
            alignment="center"
            showDivider={true}
          />
          <Grid
            container
            spacing={3}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            {partners.map(({ icon: Icon, alt }, index) => (
              <Grid item xs={6} sm={3} className={classes.grid} key={index}>
                <Icon className={classes.logo} alt={alt} />
              </Grid>
            ))}
          </Grid>
          <StyledButton buttonText="About Us" />
        </Paper>
      </div>
    </div>
  );
}
