import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemIcon, Typography } from "@material-ui/core";
import verboseSource from "../../Admin/Objects/AutoForm/verboseSource";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(3),
  },
  container: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    maxWidth: "90%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      maxWidth: "70%",
    },
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    height: "100%",
    maxHeight: 300,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    padding: 0,
    borderRadius: theme.spacing(1),
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: 0,
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      transition: "0.3s ease",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  listItemSelected: {
    backgroundColor: theme.palette.action.selected,
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.action.hover,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  listTitle: {
    padding: theme.spacing(1),
    backgroundColor: "#eee",
    borderBottom: "1px solid #ccc",
    borderRadius: theme.spacing(1) + "px " + theme.spacing(1) + "px 0 0",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    padding: theme.spacing(1),
  },
  icon: {
    minWidth: 24,
    width: 24,
    height: 24,
  },
}));

export default function DualList({
  fieldName,
  selectedOptions,
  choices,
  handleComponentsChange,
}) {
  const classes = useStyles();
  const [left, setLeft] = useState(choices);
  const [right, setRight] = useState(selectedOptions);

  useEffect(() => {
    const filteredChoices = choices.filter((choice) => {
      return !selectedOptions.some((selected) => selected.id === choice.id);
    });
    setLeft(filteredChoices);
  }, [choices, selectedOptions]);

  const handleRightClick = (item) => () => {
    setLeft(left.filter((i) => i.id !== item.id));
    setRight([...right, item]);
    handleComponentsChange(fieldName, [...right, item]);
  };

  const handleLeftClick = (item) => () => {
    setRight(right.filter((i) => i.id !== item.id));
    setLeft([...left, item]);
    handleComponentsChange(
      fieldName,
      right.filter((i) => i.id !== item.id)
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.listContainer}>
        <Box style={{ width: "100%" }}>
          <Typography variant="h3" align="center" style={{ marginBottom: 8 }}>
            Available
          </Typography>
          {left && left.length > 0 ? (
            <List dense className={classes.list} style={{ marginRight: 8 }}>
              {left.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    className={classes.listItem}
                    onClick={handleRightClick(item)}
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                  >
                    <ListItemText primary={verboseSource(fieldName, item)} />
                    <ListItemIcon className={classes.icon}>
                      <ArrowForwardIcon />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <p>No available options</p>
          )}
        </Box>
        <Box style={{ width: "100%" }}>
          <Typography variant="h3" align="center" style={{ marginBottom: 8 }}>
            Selected
          </Typography>
          {right && right.length > 0 ? (
            <List dense className={classes.list} style={{ marginLeft: 8 }}>
              {right.map((item, index) => (
                <ListItem
                  key={index}
                  className={classes.listItem}
                  onClick={handleLeftClick(item)}
                  style={{ paddingLeft: 8, paddingRight: 8 }}
                >
                  <ListItemIcon className={classes.icon}>
                    <ArrowBackIcon />
                  </ListItemIcon>
                  <ListItemText
                    style={{ textAlign: "right" }}
                    primary={verboseSource(fieldName, item)}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No selected options</p>
          )}
        </Box>
      </Box>
    </Box>
  );
}
