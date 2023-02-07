import {
  Container,
  Grid,
  Button,
  makeStyles,
  Box,
  Card,
  CardMedia,
  Slide,
} from "@material-ui/core";
import SocialSection from "../../Elements/Buttons/SocialButtons";
import ContactButtons from "../../Elements/Buttons/ContactButtons";
import HeroBlock from "../../Elements/TextBlocks/HeroBlock/HeroBlock";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
    padding: 20,
    marginBottom: 40,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  card: {
    boxShadow: theme.shadows[1],
    margin: theme.spacing(0, 0),
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function StandardHero() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={4} alignItems="center">
        <Slide in={true} direction="right" timeout={1000}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{}}>
              <HeroBlock
                title="Custom Designs"
                heading="Modern Framework, <br /> Design, and Hosting"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium elit sed consectetur ultricies. Praesent lacinia luctus lacus, sit amet cursus nisl faucibus ac. Proin sollicitudin, tellus et scelerisque hendrerit, leo turpis ornare diam, ac fermentum massa diam a nisi."
                btnText="Get Started"
                btnLink="/about"
                showButton={true}
              />
            </div>

            <Grid item xs={12} md={12} className={classes.contactContainer}>
              <ContactButtons />
              <SocialSection />
            </Grid>
          </Grid>
        </Slide>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
