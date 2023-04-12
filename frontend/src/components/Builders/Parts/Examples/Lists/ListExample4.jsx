import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { taskExampleData } from "./listExampleData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
  },
  sectionHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2),
    borderRadius: 0,
  },
  listItem: {
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listHeader: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  listSubtitle: {
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
  listDescription: {
    color: theme.palette.text.primary,
  },
}));

function ListExample4() {
  const classes = useStyles();

  const categories = Array.from(
    new Set(taskExampleData.map((item) => item.category))
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.header} square>
        <Typography variant="h6">Task List</Typography>
      </Paper>
      <List component="nav" aria-label="task list">
        {categories.map((category) => (
          <div key={category}>
            <Paper className={classes.sectionHeader} square>
              <Typography variant="subtitle1">{category}</Typography>
            </Paper>
            {taskExampleData
              .filter((item) => item.category === category)
              .map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem button className={classes.listItem}>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            className={classes.listHeader}
                            component="span"
                            variant="body1"
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            className={classes.listSubtitle}
                            component="span"
                            variant="body2"
                          >
                            {item.subtitle}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <Typography
                          className={classes.listDescription}
                          component="span"
                          variant="body2"
                        >
                          {item.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </div>
        ))}
      </List>
    </div>
  );
}

export default ListExample4;
