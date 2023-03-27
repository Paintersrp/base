import { makeStyles } from "@material-ui/core";

const CondensedTopMedia = makeStyles((theme) => ({
  pricingCard: {
    color: "white",
    backgroundColor: theme.palette.background.light,
    minWidth: 375,
    width: 375,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[3],
    borderRadius: 8,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
    },
    [theme.breakpoints.down("md")]: {
      minWidth: 325,
      width: 325,
    },
  },
  pricingTitle: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "Poppins",
    color: theme.palette.text.dark,
    marginTop: theme.spacing(2),
  },
  pricingPrice: {
    textAlign: "center",
    padding: theme.spacing(1, 0, 1, 0),
    margin: 0,
    color: theme.palette.text.dark,
  },
  media: {
    paddingTop: "56.25%",
    height: "100%",
  },
  pricingFeatures: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "center",
    minHeight: 325,
  },
  checkIcon: {
    color: theme.palette.primary.main,
    marginRight: "10px",
  },
  checkIconAlt: {
    color: theme.palette.secondary.main,
    marginRight: "10px",
  },
  detail: {
    padding: theme.spacing(0.5, 1, 0.5, 1),
    color: theme.palette.text.dark,
  },
  detailAlt: {
    padding: theme.spacing(0.5, 1, 0.5, 1),
    color: theme.palette.text.dark,
  },
  pricingButton: {
    marginTop: theme.spacing(0),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.light,
    },
  },
  // Dialog Styles
  detailsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    [theme.breakpoints.down("md")]: {},
  },
  detailsTitle: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  detailsList: {
    fontFamily: "Poppins",
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(0),
    textAlign: "center",
  },
  detailsButton: {
    fontFamily: "Poppins",
    width: "25%",
    marginTop: theme.spacing(0),
    backgroundColor: "#b71c1c",
    color: "white",
    "&:hover": {
      backgroundColor: "#880e0e",
    },
  },
  container: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    width: "100%",
  },
  dialog: {
    backgroundColor: "transparent",
    width: "100%",
  },
  paper: {
    padding: 0,
    margin: theme.spacing(0, 2, 0, 2),
    width: "100%",
    backgroundColor: theme.palette.background.light,
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px #00000066",
  },
  closeIcon: {
    right: 10,
    top: 10,
    position: "absolute",
    fontSize: "1rem",
    color: theme.palette.text.dark,
    backgroundColor: "inherit",
    justifyContent: "right",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      color: "red",
    },
  },
  itemText: {
    paddingBottom: theme.spacing(2),
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const CardHeadStyles1 = makeStyles((theme) => ({
  pricingTitle: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
    // fontSize: theme.fontSize.four,
    textAlign: "center",
    fontFamily: "Poppins",
    color: theme.palette.primary.dark,
    opacity: 0.9,
    marginTop: theme.spacing(7),
  },
  pricingPrice: {
    // fontSize: theme.fontSize.three,
    textAlign: "center",
    padding: theme.spacing(1, 0, 1, 0),
    margin: 0,
  },
  media: {
    height: 200,
    width: "100%",
    scale: "1.35",
    display: "flex",
    margin: "auto",
    padding: 0,
    marginBottom: 20,
  },
}));

const CardHeadStyles2 = makeStyles((theme) => ({
  pricingTitle: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
    // fontSize: theme.fontSize.two,
    textAlign: "center",
    fontFamily: "Poppins",
    // color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(-30),
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    scale: "2",
  },
  pricingPrice: {
    // fontSize: theme.fontSize.three,
    textAlign: "center",
    padding: theme.spacing(1, 0, 1, 0),
    margin: 0,
    color: "black",
    marginTop: theme.spacing(32),
  },
  media: {
    height: 200,
    width: "100%",
    scale: "1.35",
    display: "flex",
    margin: "auto",
    padding: 0,
    marginBottom: 20,
  },
}));

export { CondensedTopMedia, CardHeadStyles1, CardHeadStyles2 };
