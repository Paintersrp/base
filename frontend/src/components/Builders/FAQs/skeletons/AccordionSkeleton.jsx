import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    overflow: "hidden",
  },
  summary: {
    padding: theme.spacing(1, 2),
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
  summaryContent: {
    display: "flex",
    alignItems: "center",
  },
  details: {
    padding: theme.spacing(1, 2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const AccordionSkeleton = () => {
  const classes = useStyles();

  return (
    <Accordion className={classes.root} defaultExpanded>
      <AccordionSummary
        className={classes.summary}
        expandIcon={
          <IconButton size="small">
            <ExpandMoreIcon />
          </IconButton>
        }
      >
        <div className={classes.summaryContent}>
          <Skeleton
            variant="circle"
            width={40}
            height={40}
            className={classes.icon}
          />
          <Typography>
            <Skeleton variant="text" width={150} />
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Skeleton variant="text" width={500} />
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSkeleton;
