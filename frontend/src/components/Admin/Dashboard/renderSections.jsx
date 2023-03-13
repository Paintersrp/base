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
  ListItemIcon,
  Tooltip,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Add, Launch } from "@material-ui/icons";
import renderModels from "./renderModels";
import { Link } from "react-router-dom";
import { renderIcon } from "./renderIcon";

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
              <IconButton
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                onClick={toggleOpen}
              >
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderIcon(appName, classes.modelIcon)}
                <Typography variant="h3">
                  {appName.charAt(0).toUpperCase() + appName.slice(1)}
                </Typography>
              </div>
            }
          />
          <Collapse in={isOpen}>
            <CardContent
              className={classes.background}
              classes={{ root: classes.cardContent }}
            >
              <List container>
                {renderModels({
                  modelItem,
                  appName,
                  classes,
                })}
                {appName !== "general" && appName !== "jobs" && (
                  <Link to={`/${appName === "landing" ? "" : appName}`}>
                    <ListItemIcon
                      style={{
                        color: "black",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 8,
                      }}
                    >
                      <Tooltip title="View Site Page" placement="top">
                        <IconButton
                          className={classes.launchButton}
                          size="small"
                        >
                          <Launch />
                        </IconButton>
                      </Tooltip>
                    </ListItemIcon>
                  </Link>
                )}
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
