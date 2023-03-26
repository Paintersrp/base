import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "../../Elements/Icon/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1, 3, 3, 3),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(3, 2, 1, 2),
    alignItems: "flex-start",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

function AppDetailsPanel({
  appName,
  numModels,
  numObjects,
  models,
  open,
  toggleOpen,
}) {
  const classes = useStyles();
  console.log("models: ", models);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3">{`Statistics`}</Typography>
          </div>
        }
        className={classes.header}
        avatar={<Tune className={classes.icon} />}
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
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={open}>
        <CardContent>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Tune className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Number of Models" secondary={numModels} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DataObjectIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary="Number of Objects"
                secondary={numObjects}
              />
            </ListItem>
            {models.map((model) => {
              console.log(model);
              if (model.visibility === false) {
                return null;
              }
              return (
                <ListItem key={model.name}>
                  <ListItemIcon>
                    <Icon icon={model.icon} className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={model.name}
                    secondary={`${model.num_objects} objects`}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AppDetailsPanel;
