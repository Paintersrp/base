import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Select, MenuItem } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import DemoItemSwitch from "./DemoItemSwitch";
import BaseContent from "../Base/BaseContent";
import TaskList from "../../Builders/Lists/Display/TaskList/TaskList";
import { demoOptions } from "./DemoDataSet";
import { Divider } from "@mui/material";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  select: {
    width: "100%",
    maxHeight: "50px",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,

      padding: "10.5px 16px 10.5px",
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 64,
      overflowY: "auto",
    },
  },
  toggleButtonGroup: {
    marginBottom: theme.spacing(2),
  },
  toggleButton: {
    marginRight: theme.spacing(1),
  },
  menuList: {
    padding: 0,
  },
}));

const DemoItem = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOption, setSelectedOption] = useState("avatar");
  const [selectedDisplay, setSelectedDisplay] = useState("Avatar List");
  const [selectedTaskList, setSelectedTaskList] = useState([]);
  const [ready, setReady] = useState(false);
  const [taskListData, setTaskListData] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const queryParams = demoOptions
      .map((option) => `title=${option.display.replace(/\s+/g, "-")}`)
      .join("&");
    const apiUrl = `/tasklist-query/?${queryParams}`;

    axiosInstance
      .get(apiUrl)
      .then((response) => {
        setTaskListData(response.data);
        setSelectedTaskList(response.data[0]);
        console.log("setTaskListData: ", response.data);
        setReady(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredOptions = demoOptions.filter(
    (option) => showAll || option.category === selectedCategory
  );

  const optionDisplays = demoOptions.reduce((acc, curr) => {
    acc[curr.value] = curr.display;
    return acc;
  }, {});

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedOption(
      event.target.value === "All"
        ? demoOptions[0].value
        : demoOptions.filter(
            (option) => option.category === event.target.value
          )[0].value
    );
    setSelectedDisplay(
      optionDisplays[
        event.target.value === "All"
          ? demoOptions[0].value
          : demoOptions.filter(
              (option) => option.category === event.target.value
            )[0].value
      ]
    );
    setShowAll(event.target.value === "All");
  };

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    setSelectedDisplay(optionDisplays[event.target.value]);

    const selectedTaskListData = taskListData.find((item) => {
      return (
        item.title.toLowerCase() ===
        optionDisplays[event.target.value].toLowerCase()
      );
    });
    setSelectedTaskList(selectedTaskListData);
  };

  const handleListUpdate = (listId, updatedList) => {
    const listIndex = taskListData.findIndex((list) => list.id === listId);
    setTaskListData((prevTaskListData) => {
      const newTaskListData = [...prevTaskListData];
      newTaskListData[listIndex] = updatedList;
      return newTaskListData;
    });
  };

  if (!ready) {
    return null;
  }

  const categories = [...new Set(demoOptions.map((option) => option.category))];

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <BaseContent
          justifyChildren="center"
          header="Item Demo"
          subheader={selectedDisplay || "Title"}
          maxWidth={1300}
        >
          <div style={{ marginTop: 0, marginBottom: 32, width: "100%" }}>
            <Divider />
          </div>
          <Grid container justifyContent="center">
            <ToggleButtonGroup
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={classes.toggleButtonGroup}
            >
              <ToggleButton value="All" className={classes.toggleButton}>
                All
              </ToggleButton>
              {categories.map((category) => (
                <ToggleButton
                  key={category}
                  value={category}
                  className={classes.toggleButton}
                >
                  {category}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <div style={{ maxWidth: 350, width: "100%" }}>
              <Select
                className={classes.select}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.menuPaper,
                    list: classes.menuList,
                  },
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                variant="outlined"
                name="option"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {filteredOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.display}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Grid>

          <Grid
            xs={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "0px 16px 16px 16px",
              borderRight: "1px solid lightgrey",
            }}
          >
            <DemoItemSwitch item={selectedOption} />
          </Grid>
          {selectedTaskList && (
            <Grid
              xs={12}
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "0px 16px 16px 16px",
              }}
            >
              <TaskList
                data={selectedTaskList.tasks}
                list={selectedTaskList}
                handleListUpdate={handleListUpdate}
              />
            </Grid>
          )}
        </BaseContent>
      </Paper>
    </div>
  );
};

export default DemoItem;
