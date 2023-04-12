import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Collapse,
  CardHeader,
  makeStyles,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import RestoreIcon from "@mui/icons-material/Restore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  rootContainer: {
    maxWidth: 350,
  },
  cardContent: {
    padding: theme.spacing(0, 0, 2, 0),
    "&:last-child": {
      paddingBottom: `${theme.spacing(0)}px !important`,
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: `${theme.spacing(0)}px !important`,
    },
  },
  background: {
    background: "#F5F5F5",
  },
  cardHeader: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2, 2, 2, 2),
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
  restoreButton: {
    color: theme.palette.success.main,
    marginLeft: 8,
  },
  listItem: {
    padding: theme.spacing(0.25, 2, 0.25, 2),
    "&:hover": {
      background: theme.palette.grey[300],
    },
  },
}));

export default function TableRecovery({
  dataHistory,
  type,
  recoverFunc,
  justify = "center",
}) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <div>
      <Grid
        container
        spacing={2}
        className={classes.root}
        style={{ justifyContent: justify }}
      >
        <Grid item xs={12} className={classes.rootContainer}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              title={`Deleted ${type}`}
              action={
                <IconButton
                  onClick={() => setShow(!show)}
                  style={{ color: "white", marginTop: 4 }}
                  size="small"
                >
                  {show ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              }
            />
            <CardContent
              className={classes.background}
              classes={{ root: classes.cardContent }}
            >
              <Collapse in={show}>
                <Grid container spacing={0}>
                  <List style={{ width: "100%", padding: 0 }}>
                    {dataHistory.map((item, index) => (
                      <ListItem key={index} className={classes.listItem}>
                        <ListItemText
                          primary={`Row Name: ${item.row.name}`}
                          secondary={`Cells: ${item.cells.length}`}
                        />
                        <ListItemIcon style={{ minWidth: 20 }}>
                          <IconButton
                            onClick={() => recoverFunc(index)}
                            size="small"
                            className={classes.restoreButton}
                          >
                            <RestoreIcon />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
