import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    maxWidth: 860,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
  card: {
    maxWidth: 350,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
    },
  },
  cardContent: {
    padding: "0px 16px 0px 16px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  socialIcons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  iconButton: {
    padding: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  chip: {
    margin: "3px 3px 3px 3px",
  },
  title: {
    color: "black",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: 5,
  },
  subheader: {
    color: theme.palette.primary.dark,
    fontSize: "0.85rem",
    fontWeight: 600,
    fontFamily: "Poppins",
  },
  body: {
    padding: 0,
    color: "black",
    minHeight: 100,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    color: "black",
  },
}));

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO",
    image: "/images/members/member1.webp",
    bio: "Jane Doe is a seasoned entrepreneur and business leader. She has a passion for innovation and has led our company to great success.",
    linkedIn: "https://www.linkedin.com/in/jane-doe/",
    github: "https://github.com/jane-doe",
    twitter: "https://twitter.com/jane_doe",
    skills: ["Not much"],
  },
  {
    name: "John Doe",
    role: "CTO",
    image: "/images/members/member2.webp",
    bio: "John Doe is a highly skilled software engineer and technology expert. He has a wealth of experience in developing cutting-edge technology solutions for various industries.",
    linkedIn: "https://www.linkedin.com/in/john-doe/",
    github: "https://github.com/john-doe",
    twitter: "https://twitter.com/john_doe",
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
  },
  {
    name: "Jane Smith",
    role: "CMO",
    image: "/images/members/member3.webp",
    bio: "Jane Smith is a creative marketing professional with a proven track record of success. She has a unique ability to connect with customers and bring a fresh perspective to our marketing initiatives.",
    linkedIn: "https://www.linkedin.com/in/jane-smith/",
    github: "https://github.com/jane-smith",
    twitter: "https://twitter.com/jane_smith",
    skills: [
      "Marketing",
      "Branding",
      "Advertising",
      "Content Creation",
      "Social Media",
    ],
  },
  {
    name: "Jane Smith",
    role: "CMO",
    image: "/images/members/member3.webp",
    bio: "Jane Smith is a creative marketing professional with a proven track record of success. She has a unique ability to connect with customers and bring a fresh perspective to our marketing initiatives.",
    linkedIn: "https://www.linkedin.com/in/jane-smith/",
    github: "https://github.com/jane-smith",
    twitter: "https://twitter.com/jane_smith",
    skills: [
      "Marketing",
      "Branding",
      "Advertising",
      "Content Creation",
      "Social Media",
    ],
  },
];

const TeamMembers = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} sm={12} className={classes.section}>
          <Typography variant="h3" className={classes.sectionTitle}>
            Company Management
          </Typography>
        </Grid>
        {teamMembers.map((member) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={member.name}
            className={classes.container}
          >
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    variant="rounded"
                    src={member.image}
                    className={classes.avatar}
                  />
                }
                title={member.name}
                subheader={member.role}
                classes={{ title: classes.title, subheader: classes.subheader }}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.body}
                >
                  {member.bio}
                </Typography>
                <div className={classes.socialIcons}>
                  <IconButton
                    className={classes.iconButton}
                    href={member.linkedIn}
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    href={member.github}
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    href={member.twitter}
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamMembers;
