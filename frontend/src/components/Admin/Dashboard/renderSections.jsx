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
import AdminButton from "../../Elements/Buttons/AdminButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function renderSections({
  models,
  configs,
  openAppSections,
  setOpenAppSections,
  classes,
}) {
  const sections = [];
  Object.entries(models).map(([appName, modelItem], index) => {
    console.log("modelItem", modelItem);
    console.log("config: ", configs[appName]);
    const isOpen = Boolean(openAppSections[appName]);
    const toggleOpen = () =>
      setOpenAppSections((prev) => ({ ...prev, [appName]: !isOpen }));

    if (configs[appName].visibility === false) {
      return null;
    }

    sections.push(
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        key={appName}
        className={classes.dashContainer}
      >
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
                color="secondary"
                onClick={toggleOpen}
              >
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
            title={
              <Link
                to={`/admin/model/${appName}`}
                state={{
                  appName: appName,
                }}
                key={appName}
                className={classes.hoverAppLink}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {renderIcon(appName, classes.modelIcon)}
                  <Typography variant="h3">
                    {appName.charAt(0).toUpperCase() + appName.slice(1)}
                  </Typography>
                </div>
              </Link>
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
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginTop: 8,
                  }}
                >
                  <Link
                    to={`/admin/model/${appName}`}
                    style={{ marginRight: 2 }}
                  >
                    <Tooltip
                      title={`${
                        appName.charAt(0).toUpperCase() + appName.slice(1)
                      } App Admin`}
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton className={classes.launchButton} size="small">
                        <AdminPanelSettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  {appName !== "general" &&
                    appName !== "jobs" &&
                    appName !== "authorization" && (
                      <Link
                        to={`/${appName === "landing" ? "" : appName}`}
                        style={{ marginLeft: 2, marginRight: 16 }}
                      >
                        <Tooltip
                          title="View Site Page"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            className={classes.launchButton}
                            size="small"
                          >
                            <Launch />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                </div>
              </List>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  });

  return sections;
}
