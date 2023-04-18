import React, { useState } from "react";
import {
  ListItem,
  Divider,
  Collapse,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import Text from "../../Elements/Layout/Text/Text";
import FormField from "../../Elements/Fields/FormField";
import Flexer from "../../Elements/Layout/Container/Flexer";
import ConfirmCancelButtons from "../Parts/Buttons/ConfirmCancelButtons";
import ErrorMessage from "../../Elements/Errors/ErrorMessage";
import HelpText from "../Parts/Text/HelpText";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 1.5, 0.5),
  },
}));

const taskFields = [
  { name: "title", label: "Title*", type: "text", md: 9 },
  {
    name: "description",
    label: "Description (Optional)",
    type: "text",
    md: 9,
    multiline: true,
  },
];

function TaskListSectionForm({
  sectionFormData,
  addOpen,
  setSectionFormData,
  handleSectionFormChange,
  handleSectionAdd,
  setAddOpen,
  errors,
  handleErrors,
}) {
  const classes = useStyles();
  const [data, setData] = useState(sectionFormData);

  const handleCancel = () => {
    setAddOpen(false);
    setTimeout(() => {
      setSectionFormData({ ...data });
    }, 500);
  };

  return (
    <div key={"add"} style={{ marginBottom: addOpen ? 16 : 0 }}>
      <Collapse in={addOpen}>
        <Divider variant="fullWidth" style={{ marginBottom: 12 }} />
        <Text t="h5" a="c" mt={16} mb={16}>
          Add Section
        </Text>
        <ListItem className={`${classes.listItem}`}>
          <Grid container justifyContent="center">
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
                      onChange={handleSectionFormChange}
                      value={sectionFormData[field.name]}
                      minRows={3}
                    />
                  </Container>
                </Grid>
              );
            })}
          </Grid>
        </ListItem>
        <Flexer j="c" mt={8}>
          <ConfirmCancelButtons
            confirmFunc={handleSectionAdd}
            cancelFunc={handleCancel}
          />
        </Flexer>
        {errors && (
          <div>
            <ErrorMessage errors={errors} clearFunc={handleErrors} />
          </div>
        )}
      </Collapse>
    </div>
  );
}

export default TaskListSectionForm;
