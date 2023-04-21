import React, { useState } from "react";
import {
  ListItem,
  Divider,
  Collapse,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";

import Text from "../../../../Elements/Layout/Text/Text";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import FormField from "../../../../Elements/Fields/FormField";

import HelpText from "../../../Parts/Text/HelpText";
import ConfirmCancelButtons from "../../../Parts/Buttons/ConfirmCancelButtons";
import { filterState } from "../../../../../utils/dataHandlers/filterHandlers";

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
  label = "Add",
  sectionFormData,
  addOpen,
  setSectionFormData,
  handleSectionFormChange,
  handleSectionAdd,
  setAddOpen,
  errors,
  setErrors,
  nested = null,
}) {
  const classes = useStyles();
  const [data, setData] = useState(sectionFormData);

  const handleCancel = (e) => {
    if (nested) {
      setAddOpen(e);
      setTimeout(() => {
        sectionFormData.title = data.title;
        sectionFormData.description = data.description;
      }, 500);
    } else {
      setAddOpen(false);
      setTimeout(() => {
        setSectionFormData({ ...data });
      }, 500);
    }
  };

  return (
    <div key={"add"} style={{ marginBottom: addOpen ? 16 : 0 }}>
      <Collapse in={addOpen}>
        <Divider variant="fullWidth" style={{ marginBottom: 12 }} />
        <Text t="h5" a="c" mt={16} mb={16}>
          {label} Section
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
            cancelFunc={(e) => handleCancel(e)}
          />
        </Flexer>

        {errors && errors[nested] && (
          <React.Fragment>
            {nested ? (
              <div>
                <ErrorMessage
                  errors={errors[nested]}
                  setErrors={setErrors}
                  nestedName={nested}
                />
              </div>
            ) : (
              <div>
                <ErrorMessage errors={errors} setErrors={setErrors} />
              </div>
            )}
          </React.Fragment>
        )}
      </Collapse>
    </div>
  );
}

export default TaskListSectionForm;
