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
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    maxHeight: 300,

    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    padding: 0,
    borderRadius: theme.spacing(0.5),
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ccc",
      borderRadius: theme.spacing(0.5),
    },
    "&::-moz-scrollbar": {
      width: 10,
      height: 10,
      background: "#ccc",
      borderRadius: theme.spacing(0.5),
    },
    "&::-moz-scrollbar-thumb": {
      background: "#ccc",
      borderRadius: theme.spacing(0.5),
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc transparent",
  },
  listItem: {
    padding: theme.spacing(0, 1, 0, 1),
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0.5, 2, 0.5, 2),
      transition: "0.3s ease",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  listItemNone: {
    padding: theme.spacing(0, 1, 0, 1),

    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0.5, 2, 0.5, 2),
    },
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
            <List dense className={classes.list} style={{ marginRight: 8 }}>
              <ListItem key={99} className={classes.listItemNone}>
                <ListItemText
                  primary={"All Options Selected"}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
            </List>
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
            <List dense className={classes.list} style={{ marginLeft: 8 }}>
              <ListItem key={99} className={classes.listItemNone}>
                <ListItemText
                  primary={"No Options Selected"}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
