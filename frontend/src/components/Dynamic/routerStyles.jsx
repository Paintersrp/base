import { makeStyles } from "@material-ui/core";

const routerStyles = makeStyles((theme) => ({
  valueRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  valueContainer: {
    maxWidth: 800,
  },
}));

export { routerStyles };
