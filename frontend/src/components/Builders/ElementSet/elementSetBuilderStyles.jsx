import { makeStyles } from "@material-ui/core";

export const elementSetBuilderStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));
