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

import ConfirmCancelButtons from "../../../Parts/Buttons/ConfirmCancelButtons";
import HelpText from "../../../Parts/Text/HelpText";

import { validateListDetails } from "../../utils/taskListValidation";
import { useEffect } from "react";

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

function TaskListDetailsForm({
  listFormData,
  editOpen,
  setListFormData,
  setEditOpen,
}) {
  const classes = useStyles();
  const [data, setData] = useState(listFormData);
  const [listErrors, setListErrors] = useState("");
  const [initialState, setInitialState] = useState(listFormData);

  useEffect(() => {
    setData(listFormData);
  }, [listFormData]);

  const handleDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    let errors = validateListDetails(data);
    setListErrors(errors);
    if (errors.length > 0) {
      return;
    }

    setListFormData(data);
    setEditOpen(false);
  };

  const handleCancel = () => {
    setEditOpen(false);
    setTimeout(() => {
      setData({ ...initialState });
    }, 500);
  };

  return (
    <div key={"add"} style={{ marginBottom: editOpen ? 16 : 0 }}>
      <Collapse in={editOpen}>
        <Divider variant="fullWidth" style={{ marginBottom: 12 }} />
        <Text t="h5" a="c" mt={16} mb={16}>
          List Details
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
                      onChange={handleDataChange}
                      value={data[field.name]}
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
            confirmFunc={handleUpdate}
            cancelFunc={handleCancel}
          />
        </Flexer>
        {listErrors && (
          <div>
            <ErrorMessage errors={listErrors} setErrors={setListErrors} />
          </div>
        )}
      </Collapse>
    </div>
  );
}

export default TaskListDetailsForm;
