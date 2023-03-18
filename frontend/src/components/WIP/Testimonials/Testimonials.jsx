import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Avatar,
  Container,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";
import EditButton from "../../Elements/Buttons/EditButton";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock/TitleBlock";
import TitleBlockEditor from "../../Elements/TextBlocks/TitleBlock/TitleBlockEditor";
import TestimonialEditView from "./TestimonialEditView";

const useStyles = makeStyles((theme) => ({
  testimonialContent: {
    fontFamily: "Poppins",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    borderRadius: 14,
    position: "relative",
    "&::before": {
      content: `""`,
      width: 0,
      height: 0,
      borderLeft: "solid transparent",
      borderLeftWidth: theme.spacing(2),
      borderRight: "solid transparent",
      borderRightWidth: theme.spacing(2),
      borderTop: "solid",
      borderTopWidth: theme.spacing(2),
      borderTopColor: theme.palette.primary.main,
      position: "absolute",
      bottom: "-16px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  testimonialHeading: {
    fontFamily: "Poppins",
    fontSize: "1.0rem",
    marginBottom: 10,
    color: "white",
    fontWeight: 600,
  },
  testimonialText: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "white",
    fontSize: "0.85rem",
  },
  testimonialAvatar: {
    fontFamily: "Poppins",
    color: theme.palette.text.dark,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(1),
    },
    "& .MuiAvatar-root": {
      width: 50,
      height: 50,
      marginRight: 10,
    },
  },
  testimonialAvatarName: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "0.85rem",
  },
  testimonialAvatarTitle: {
    fontFamily: "Poppins",
    color: theme.palette.text.dark,
    fontSize: "0.85rem",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  speechBubbles: {
    fontFamily: "Poppins",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(12),
    backgroundColor: theme.palette.background.light,
    color: "white",
    justifyContent: "center",
    display: "flex",
  },
  avatar: {
    border: `1px solid ${theme.palette.primary.dark}`,
    "& .MuiAvatar-root": {
      width: 80,
      height: 80,
    },
  },
}));

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.testimonialContent}>{children}</Box>;
};

export const TestimonialHeading = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.testimonialHeading}>
      {children}
    </Typography>
  );
};

const TestimonialText = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.testimonialText}>
      {children}
    </Typography>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.testimonialAvatar} alignItems="center">
      <Avatar src={src} alt={name} className={classes.avatar} />
      <Grid item>
        <Typography
          variant="subtitle1"
          className={classes.testimonialAvatarName}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.testimonialAvatarTitle}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function Testimonials() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get("/titleblock/testimonials/")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });

    axiosInstance
      .get("/testimonials/")
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const updateTitleBlock = (updateTitleBlock) => {
    setData(updateTitleBlock);
    setEditing(false);
  };

  const updateTestimonials = (updateTestimonials) => {
    setTestimonials(updateTestimonials);
    setEditing(false);
  };

  return (
    <Box className={classes.speechBubbles}>
      <Container style={{ maxWidth: 1200 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {!editing ? (
              <TitleBlock
                key={data.name}
                subtitle={data.subtitle}
                title={data.title}
                alignment={data.alignment}
                showDivider={data.show_divider}
              />
            ) : (
              <TitleBlockEditor titleBlock={data} onUpdate={updateTitleBlock} />
            )}
          </Grid>
          {testimonials.map((testimonial, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              className={classes.speechBubbles}
            >
              {!editing ? (
                <SlideIntoViewPort from="below">
                  <Testimonial>
                    <TestimonialContent>
                      <TestimonialHeading>
                        {testimonial.heading}
                      </TestimonialHeading>
                      <TestimonialText>{testimonial.text}</TestimonialText>
                    </TestimonialContent>
                    <TestimonialAvatar
                      src={testimonial.image}
                      name={testimonial.name}
                      title={testimonial.position}
                    />
                  </Testimonial>
                </SlideIntoViewPort>
              ) : (
                <TestimonialEditView
                  testimonial={testimonial}
                  onUpdate={updateTestimonials}
                />
              )}
            </Grid>
          ))}
        </Grid>
        {auth.is_superuser ? (
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
          />
        ) : null}
      </Container>
    </Box>
  );
}
