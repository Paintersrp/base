import { Card, CardMedia, Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn, Twitter } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 345,
    minWidth: 345,
    margin: 10,
    backgroundColor: "#212121",
    "&:hover": {
      boxShadow: theme.shadows[14],
      border: "1px solid gold",
    },
  },
  cardContent: {
    position: "relative",
    bottom: -87,
    width: "100%",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.3)",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  chip: {
    color: theme.palette.secondary.main,
    backgroundColor: "#313131",
    margin: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  name: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
    lineHeight: "1.25",
  },
  position: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: theme.palette.secondary.dark,
    lineHeight: "1.25",
  },
  socialIcons: {
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
      <CardMedia className={classes.media} image={image}>
        <div className={classes.cardContent}>
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
        </div>
      </CardMedia>
    </Card>
  );
}
