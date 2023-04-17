import React from "react";
import {
  ListItem,
  Divider,
  Collapse,
  makeStyles,
  Grid,
  Container,
  MenuItem,
} from "@material-ui/core";
import Text from "../../../../Elements/Layout/Text/Text";
import FormField from "../../../../Elements/Fields/FormField";
import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ConfirmCancelButtons from "../../../Parts/Buttons/ConfirmCancelButtons";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import HelpText from "../../../Parts/Text/HelpText";

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
  taskFormData,
  addOpen,
  handleTaskFormChange,
  handleCancel,
  handleTaskAdd,
  sections,
  errors,
  handleErrors,
}) {
  const classes = useStyles();

  return (
    <div key={"add"} style={{ marginBottom: 0 }}>
      <Collapse in={addOpen}>
        <Text t="h5" a="c" mt={16} mb={16}>
          Add Task
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
                onChange={handleTaskFormChange}
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
                onChange={handleTaskFormChange}
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
                      onChange={handleTaskFormChange}
                      value={taskFormData[field.name]}
                      minRows={3}
                    />
                  </Container>
                </Grid>
              );
            })}
            <div style={{ margin: "8px 0px" }}>
              <ConfirmCancelButtons
                confirmFunc={() => handleTaskAdd(taskFormData.section)}
                cancelFunc={handleCancel}
              />
            </div>
          </Grid>
        </ListItem>

        {errors[taskFormData.section] && (
          <div>
            <ErrorMessage
              errors={errors[taskFormData.section]}
              clearFunc={handleErrors}
              override={true}
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
