import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { IconButton, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(9),
    zIndex: 1000,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    transition: "transform 0.2s ease-in-out",
    boxShadow: "none !important",
    "&:hover": {
      transform: "scale(1.01)",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(8),
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
  menuItem: {
    fontSize: "1.5rem",
    width: 56,
    height: 56,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(1),

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
}));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function ScrollTopFab() {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    scrollToTop();
  };

  return (
    <Zoom in={trigger}>
      <Tooltip
        title={"Scroll to Top"}
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <Fab
          aria-label="menu"
          className={classes.fab}
          onClick={handleClick}
          size="small"
        >
          <KeyboardArrowUpIcon style={{ fontSize: "1.5rem" }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
