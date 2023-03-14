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
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import TimelineSharpIcon from "@mui/icons-material/TimelineSharp";
import BookIcon from "@mui/icons-material/Book";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 24,
    background: "#F5F5F5",
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
    backgroundColor: "#E6E6E6",
  },
  tableCell: {
    padding: "6px 16px",
    fontSize: "0.875rem",
  },
  icon: {
    color: theme.palette.info.dark,
    marginRight: theme.spacing(2),
  },
}));

function RecentActions({ actionsOpen, setActionsOpen, recentActions }) {
  console.log("rl:", recentActions);
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
              <Link
                to="/adminlog"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="secondary">
                  <BookIcon />
                </IconButton>
              </Link>
              <IconButton onClick={handleExpandClick}>
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
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell className={classes.headerCell}>User</TableCell> */}
                      <TableCell className={classes.headerCell}>
                        Action Time
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Content Type
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
                        {/* <TableCell className={classes.tableCell}>{action.user}</TableCell> */}
                        <TableCell className={classes.tableCell}>
                          {new Date(action.action_time).toLocaleString()}
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          {action.content_type}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.change_message}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {action.obj_url === "Not Applicable" ? (
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
