import React from "react";
import {
  List,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import renderModels from "./renderModels";

export default function renderSections({
  models,
  openAppSections,
  setOpenAppSections,
  classes,
}) {
  const sections = [];

  Object.entries(models).map(([appName, modelItem], index) => {
    if (appName === "authorization") {
      return null;
    }

    const isOpen = Boolean(openAppSections[appName]);
    const toggleOpen = () =>
      setOpenAppSections((prev) => ({ ...prev, [appName]: !isOpen }));

    sections.push(
      <Grid item xs={12} sm={6} md={6} lg={4} key={appName}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            action={
              <IconButton onClick={toggleOpen}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
            title={
              <Typography variant="h3">
                {appName.charAt(0).toUpperCase() + appName.slice(1)}
              </Typography>
            }
          />
          <Collapse in={isOpen}>
            <CardContent className={classes.background}>
              <List container>
                {renderModels({
                  modelItem,
                  appName,
                  classes,
                })}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  });

  return sections;
}

// style={{
//   transition: "border 0.3s ease-in-out",
//   border:
//     "2px solid " +
//     (index % 2 === 0
//       ? theme.palette.primary.main
//       : theme.palette.secondary.main),
//   borderBottom: isOpen
//     ? "0px"
//     : "2px solid " +
//       (index % 2 === 0
//         ? theme.palette.primary.main
//         : theme.palette.secondary.main),
// }}

// style={{
//   transition: "border 0.3s ease-in-out",
//   border:
//     "2px solid " +
//     (index % 2 === 0
//       ? theme.palette.primary.main
//       : theme.palette.secondary.main),
//   borderTop: "0px",
// }}
