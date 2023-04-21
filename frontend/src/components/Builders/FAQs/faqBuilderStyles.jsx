import { makeStyles } from "@material-ui/core";

export const faqBuilderStyles = makeStyles((theme) => ({
  subheader: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  addActions: {
    display: "flex",
    padding: "0px 4px 8px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
}));
