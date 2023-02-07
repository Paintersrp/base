import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@material-ui/core";
import { MdExpandMore } from "react-icons/Md";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  question: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
    marginBottom: 4,
    color: "white",
    fontSize: "1rem",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Poppins",
    color: "white",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: "#242424",
    color: "white",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  summary: {
    backgroundColor: "#242424",
    fontFamily: "Poppins",
    color: "white",
  },
}));

const AccordionQA = ({ faq }) => {
  console.log(faq);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded([...expanded, panel]);
    } else {
      setExpanded(expanded.filter((p) => p !== panel));
    }
  };

  const transitionProps = {
    timeout: {
      enter: 400,
      exit: 400,
    },
    mountOnEnter: true,
    unmountOnExit: true,
    addEndListener: (node, done) => {
      node.addEventListener("transitionend", done, false);
    },
  };

  return (
    <Grid>
      <Accordion
        expanded={expanded.includes(faq.id)}
        onChange={handleChange(faq.id)}
        disableGutters="true"
        TransitionProps={transitionProps}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore color="white" />}
          aria-controls={`${faq.id}-content`}
          id={`${faq.id}-header`}
          className={classes.summary}
        >
          <div className={classes.question}>
            <Typography className={classes.heading}>{faq.question}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography>{faq.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default AccordionQA;
