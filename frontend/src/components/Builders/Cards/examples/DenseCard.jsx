import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Collapse,
  Avatar,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import { cardExampleStyles } from "./styles/cardExampleStyles";

export default function DenseCard() {
  const classes = cardExampleStyles();
  const [open, setOpen] = useState(true);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="My Title"
        className={classes.header}
        onClick={() => setOpen(!open)}
      />
      <Collapse in={open}>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            align="center"
          >
            This is an example of a more advanced text-only card.
          </Typography>
          <hr className={classes.hr} />
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            align="center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
            tortor augue. Etiam id justo et urna ultricies sollicitudin eu non
            velit.
          </Typography>
          <Flexer j="c">
            <Avatar className={classes.avatar}>
              <ShareIcon />
            </Avatar>
          </Flexer>
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            align="center"
          >
            Pellentesque tempor enim eget augue lacinia aliquet. Fusce iaculis
            erat ut augue malesuada fermentum. Praesent sed erat massa.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
