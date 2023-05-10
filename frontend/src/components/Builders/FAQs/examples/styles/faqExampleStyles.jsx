import { makeStyles } from "@material-ui/core";

export const faqExamplesStyles = makeStyles((theme) => ({
  //  FAQ List / Condensed List Classes
  categoryList: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    fontWeight: "700",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
  },
  question: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  answer: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },
  iconButton: {
    marginLeft: "auto",
    color: "white",
  },
  selectedCategory: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: theme.palette.primary.main,
  },
  listItem: {
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
    borderRight: `1px solid ${theme.palette.text.secondary}`,
    "&:last-child": {
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
  },

  // FAQ Tabs Classes
  tab: {
    zIndex: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    fontWeight: "700",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
    "&:focus": {
      color: theme.palette.background.light,
    },
    "&: .MuiTab-textColorInherit.Mui-selected": {
      color: theme.palette.background.light,
    },
  },
  tabsIndicator: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
  },
  summary: {
    backgroundColor: theme.palette.background.light,
    fontFamily: "Roboto",
    color: "black",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },
  preview: {
    width: "100%",
  },
}));
