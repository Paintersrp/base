import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const CaseStudiesBasic = () => {
  const classes = useStyles();

  const caseStudies = [
    {
      id: 1,
      title: "Client A: Success Story",
      description:
        "Client A came to us looking for a solution to a common problem in their industry. After developing a customized solution for their needs, Client A saw a 30% increase in revenue within the first six months.",
      image: "https://source.unsplash.com/random/502x502",
      link: "https://www.example.com/case-study-a",
    },
    {
      title: "Client B: Success Story",
      description:
        "Client B had struggled with a particular issue for years, but was unsure how to address it. Our team developed a unique strategy that helped Client B achieve a 40% increase in conversions within the first year.",
      image: "https://source.unsplash.com/random/501x501",
      link: "https://www.example.com/case-study-b",
    },
    {
      title: "Client C: Success Story",
      description:
        "Client C had tried other solutions in the past, but had not seen the results they were hoping for. Our team worked with Client C to identify the root of the problem and develop a strategy that would work for their specific needs. Within the first year, Client C saw a 50% increase in customer retention rates.",
      image: "https://source.unsplash.com/random/500x500",
      link: "https://www.example.com/case-study-c",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Success Stories
      </Typography>
      <Grid container spacing={3}>
        {caseStudies.map((caseStudy) => (
          <Grid item xs={12} sm={6} md={4} key={caseStudy.title}>
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className={classes.image}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              {caseStudy.title}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {caseStudy.description}
            </Typography>
            <a
              href={caseStudy.link}
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Read More
              </Button>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CaseStudiesBasic;
