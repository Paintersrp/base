import React from "react";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { fieldInfo } from "../_Navigation/BuilderDrawer/const/fieldInformation";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  example: {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  exampleItem: {
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

const FieldInfoBox = ({ focusedField }) => {
  const classes = useStyles();
  const { title, description, examples } = fieldInfo[focusedField || "name"];

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
        <Typography className={classes.example} variant="overline">
          Examples:
        </Typography>
        <Box className={classes.exampleItem}>
          {examples.map((example, index) => (
            <Typography key={index} variant="body2">
              - {example}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FieldInfoBox;
