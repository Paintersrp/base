import React from "react";
import {
  ListItem,
  Divider,
  Collapse,
  makeStyles,
  Grid,
  Container,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import FormField from "../../../../Elements/Fields/FormField";
import Text from "../../../../Elements/Layout/Text/Text";
import Flexer from "../../../../Elements/Layout/Container/Flexer";

import HelpText from "../../../Parts/Text/HelpText";
import ConfirmCancelButtons from "../../../Parts/Buttons/ConfirmCancelButtons";
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 1.5, 0.5),
  },
}));

const taskFields = [
  { name: "title", label: "Title*", type: "text", md: 6 },
  {
    name: "description",
    label: "Description (Optional)",
    type: "text",
    md: 12,
    multiline: true,
  },
];

const taskOptions = [
  { value: "No Priority", display: "None" },
  { value: "High Priority", display: "High" },
  { value: "Medium Priority", display: "Medium" },
  { value: "Low Priority", display: "Low" },
];

function TaskListTaskForm({
  label = "Add",
  taskFormData,
  addOpen,
  dataChange,
  handleCancel,
  handleTaskAdd,
  sections,
  errors,
  setErrors,
  keepOpen,
  handleKeepOpen,
}) {
  const classes = useStyles();
  if (!taskFormData) {
    return null;
  }

  return (
    <div key={"add"} style={{ marginBottom: 0 }}>
      <Collapse in={addOpen}>
        <Text t="h5" a="c" mt={16} mb={16}>
          {label} Task
        </Text>

        <ListItem className={`${classes.listItem}`}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              md={8}
              style={{
                paddingRight: 4,
                paddingLeft: 4,
                marginBottom: 8,
                width: "100%",
              }}
            >
              <HelpText>Priority*</HelpText>

              <BasicSelect
                name="priority"
                value={taskFormData.priority}
                onChange={dataChange}
              >
                {taskOptions.map((option) => (
                  <MenuItem value={option.value}>{option.display}</MenuItem>
                ))}
              </BasicSelect>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ paddingRight: 12, width: "100%" }}
            >
              <HelpText>Task Section*</HelpText>
              <BasicSelect
                name="section"
                value={taskFormData.section}
                onChange={dataChange}
              >
                <MenuItem value="">Select a Section</MenuItem>
                {sections.map((section) => {
                  return (
                    <MenuItem value={section.title}>{section.title}</MenuItem>
                  );
                })}
              </BasicSelect>
            </Grid>
            {taskFields.map((field) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={field.md}
                  style={{ paddingRight: 4, paddingLeft: 4, width: "100%" }}
                >
                  <Container
                    justify="flex-start"
                    style={{ width: "100%", padding: 0 }}
                  >
                    <HelpText>{field.label}</HelpText>
                    <FormField
                      required
                      multiline={field.multiline}
                      id={field.name}
                      onChange={dataChange}
                      value={taskFormData[field.name]}
                      minRows={3}
                    />
                  </Container>
                </Grid>
              );
            })}
            <Flexer j="fs">
              <FormControlLabel
                style={{ marginLeft: 0 }}
                control={
                  <Switch
                    size="small"
                    checked={keepOpen}
                    onChange={handleKeepOpen}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={
                  <Typography color="textSecondary" style={{ marginLeft: 4 }}>
                    Continue Adding
                  </Typography>
                }
              />
            </Flexer>

            <div style={{ margin: "8px 0px" }}>
              <ConfirmCancelButtons
                confirmFunc={handleTaskAdd}
                cancelFunc={handleCancel}
              />
            </div>
          </Grid>
        </ListItem>

        {errors[taskFormData.section] && (
          <div>
            <ErrorMessage
              errors={errors[taskFormData.section]}
              setErrors={setErrors}
              nestedName={taskFormData.section}
            />
          </div>
        )}
        <Divider variant="fullWidth" />
      </Collapse>
    </div>
  );
}

export default TaskListTaskForm;
