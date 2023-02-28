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
  Grid,
  CardHeader,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import axiosInstance from "../../../lib/Axios/axiosInstance";

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
}));

function RecentActions() {
  const classes = useStyles();
  const [recentActions, setRecentActions] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/recent_admin_actions/")
      .then((response) => {
        setRecentActions(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* <Grid item xs={12} sm={6} md={6} lg={4} key={appName}>
        <Card className={classes.card}>
          <Collapse in={isOpen}>
            <CardContent style={{ background: "#F5F5F5" }}>
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
      </Grid> */}
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          action={
            <IconButton onClick={handleExpandClick}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
          title={<Typography variant="h3">Recent Admin Actions</Typography>}
        />
        <Collapse in={expanded}>
          <CardContent>
            {recentActions.length > 0 ? (
              <TableContainer className={classes.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerCell}>User</TableCell>
                      <TableCell className={classes.headerCell}>
                        Action Time
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Content Type
                      </TableCell>
                      <TableCell className={classes.headerCell}>
                        Change Message
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActions.map((action, index) => (
                      <TableRow key={index}>
                        <TableCell>{action.user}</TableCell>
                        <TableCell>
                          {new Date(action.action_time).toLocaleString()}
                        </TableCell>

                        <TableCell>{action.content_type}</TableCell>
                        <TableCell>{action.change_message}</TableCell>
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
