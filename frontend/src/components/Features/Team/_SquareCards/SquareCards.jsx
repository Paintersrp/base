import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn, Twitter } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 345,
    minWidth: 345,
    margin: 10,
    backgroundColor: "white",
    "&:hover": {
      boxShadow: theme.shadows[14],
      border: "1px solid gold",
    },
  },
  cardContent: {
    width: "100%",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.3)",
  },
  media: {
    scale: "0.85",
    paddingTop: "56.25%", // 16:9
  },
  chip: {
    margin: "20px 3px 20px 3px",
    color: "black",
    backgroundColor: "#BBBBBB",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  name: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "1.5rem",
    color: "black",
    lineHeight: "1.25",
  },
  position: {
    marginTop: 5,
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "1.1rem",
    color: "black",
    lineHeight: "1.25",
  },
  socialIcons: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    color: "gold",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}));

export default function TeamCard(props) {
  const classes = useStyles();
  const { image, position, name, socials, skills } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <CardMedia className={classes.media} image={image} />
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.position}>{position}</Typography>
        <div className={classes.socialIcons}>
          {socials &&
            socials.map((s) => {
              if (s.platform === "LinkedIn") {
                return (
                  <a
                    href={s.link}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <LinkedIn className={classes.socialIcon} />
                  </a>
                );
              }
              if (s.platform === "Twitter") {
                return (
                  <a
                    href={s.link}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Twitter className={classes.socialIcon} />
                  </a>
                );
              }
              return null;
            })}
        </div>
        <div>
          {skills &&
            skills.map((skill) => (
              <Chip
                label={skill.skill}
                className={classes.chip}
                key={skill.skill}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
