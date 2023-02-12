import React from "react";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  enter: {
    opacity: 0,
  },
  enterActive: {
    opacity: 1,
    transition: "opacity 400ms ease-in",
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0,
    transition: "opacity 400ms ease-out",
  },
});

const FadeAndGrow = ({ children, in: inProp }) => {
  const classes = useStyles();

  return (
    <CSSTransition
      timeout={400}
      classNames={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        exit: classes.exit,
        exitActive: classes.exitActive,
      }}
      unmountOnExit
      in={inProp}
    >
      {children}
    </CSSTransition>
  );
};

export default FadeAndGrow;
