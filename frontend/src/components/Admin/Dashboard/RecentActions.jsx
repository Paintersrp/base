import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  CardHeader,
  Tooltip,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import TimelineSharpIcon from "@mui/icons-material/TimelineSharp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 24,
    background: "#F5F5F5",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0, 3, 0),
      madWidth: 200,
    },
  },
  tableContainer: {
    maxHeight: 400,
    background: "#F5F5F5",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bfbfbf",
      borderRadius: "0.2em",
    },
  },
  headerCell: {
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(3, 2, 2, 2),
    alignItems: "flex-start",
  },
  tableCell: {
    padding: "6px 16px",
    fontSize: "0.875rem",
  },
  icon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

function RecentActions({
  actionsOpen,
  setActionsOpen,
  recentActions,
  appName,
  modelName,
}) {
  const classes = useStyles();
  const handleExpandClick = () => {
    setActionsOpen(!actionsOpen);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          action={
            <>
              <Tooltip
                title={`View Full Log`}
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Link
                  to="/adminlog"
                  state={{
                    appName: appName ? appName : null,
                    modelName: modelName ? modelName : null,
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton color="secondary">
                    <AutoStoriesIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <IconButton onClick={handleExpandClick} color="secondary">
                {actionsOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </>
          }
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <TimelineSharpIcon
                className={classes.icon}
                style={{ fontSize: "2rem" }}
              />
              <Typography variant="h3">Recent Admin Actions</Typography>
            </div>
          }
        />
        <Collapse in={actionsOpen}>
          <CardContent>
            {recentActions.length > 0 ? (
              <TableContainer className={classes.tableContainer}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerCell}>User</TableCell>
                      <TableCell className={classes.headerCell}>
                        Action Time
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        App Label
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Model Name
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Change Message
                      </TableCell>
                      <TableCell className={classes.headerCell}>URL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActions.map((action, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.tableCell}>
                          {action.user}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {new Date(action.action_time).toLocaleString()}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.app_label}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.model_name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.change_message}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.obj_url === "Not Applicable" ||
                          action.obj_url === "Object not found" ||
                          action.obj_url === "Failed" ? (
                            <>{action.obj_url}</>
                          ) : (
                            <Link
                              className={classes.link}
                              to={`${action.obj_url}`}
                            >
                              {action.obj_url}
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No recent actions found.</Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default RecentActions;
