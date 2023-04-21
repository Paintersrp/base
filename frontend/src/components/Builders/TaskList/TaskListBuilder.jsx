import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";
import FormField from "../../Elements/Fields/FormField";
import BaseContent from "../../Elements/Base/BaseContent";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Text from "../../Elements/Layout/Text/Text";
import SaveButton from "../Parts/Buttons/SaveButton";
import TaskList from "./TaskList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    width: "100%",
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },
}));

const listFields = [
  { name: "title", label: "List Title*", type: "text", md: 8 },
  {
    name: "description",
    label: "Description Text*",
    type: "text",
    md: 8,
    multiline: true,
  },
];

const TaskListBuilder = () => {
  const classes = useStyles();
  const [listFormData, setListFormData] = useState({
    title: "",
    description: "",
  });
  const [list, setList] = useState(null);

  const handleListFormChange = (event) => {
    setListFormData({
      ...listFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleListSave = async (event) => {
    try {
      const response = await axiosInstance
        .post("/tasklist-builder/", listFormData)
        .then((response) => {
          console.log(response.data);
          setList(response.data);
          //   setErrors("");
          //   setFaqItems([]);
          //   setFormData(initialState);
        });
    } catch (error) {
      console.log(error.response.data);
      //   setApiErrors(error.response.data);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <form onSubmit={handleListSave}>
          <Grid container>
            {!list ? (
              <Grid
                item
                xs={12}
                md={12}
                style={{ padding: "0px 16px 16px 16px" }}
              >
                <BaseContent
                  header="Task List Builder"
                  subheader="List Settings"
                  justifyChildren="center"
                >
                  <div
                    style={{ marginTop: 0, marginBottom: 16, width: "100%" }}
                  >
                    <Divider />
                  </div>
                  {listFields.map((field) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={field.md}
                        style={{ paddingRight: 12, width: "100%" }}
                      >
                        <Container
                          justify="flex-start"
                          style={{ width: "100%", padding: 0 }}
                        >
                          <Typography className={classes.helpText}>
                            {field.label}
                          </Typography>
                          <Text />
                          <FormField
                            required
                            multiline={field.multiline}
                            id={field.name}
                            onChange={handleListFormChange}
                            value={listFormData[field.name]}
                            minRows={4}
                          />
                        </Container>
                      </Grid>
                    );
                  })}
                  <div className={classes.buttonContainer}>
                    <SaveButton submitFunc={handleListSave} />
                  </div>
                </BaseContent>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                md={12}
                style={{ padding: "0px 16px 16px 16px" }}
              >
                <BaseContent
                  header="Task List Builder"
                  subheader="Manage List"
                  justifyChildren="center"
                >
                  <div
                    style={{ marginTop: 0, marginBottom: 16, width: "100%" }}
                  >
                    <Divider />
                  </div>
                  <TaskList list={list} />
                </BaseContent>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default TaskListBuilder;
