import React from "react";
import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import StyledButton from "../../../../../Elements/Buttons/StyledButton";
import Text from "../../../../../Elements/Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  checkboxLabel: {
    color: "black",
    fontSize: "0.875rem",
  },
}));

const MessageFilterMixin = ({
  isReadFilter,
  setIsReadFilter,
  isArchivedFilter,
  setIsArchivedFilter,
  handleClearFilters,
}) => {
  const classes = useStyles();

  return (
    <>
      <Text
        style={{
          marginTop: 2,
          marginLeft: 4,
          marginBottom: 0,
          fontSize: "0.9rem",
          color: "black",
        }}
      >
        Filters:
      </Text>
      <FormControlLabel
        control={
          <Checkbox
            checked={isReadFilter === true}
            onChange={() =>
              setIsReadFilter(isReadFilter === true ? null : true)
            }
          />
        }
        label="Read"
        classes={{ label: classes.checkboxLabel }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isReadFilter === false}
            onChange={() =>
              setIsReadFilter(isReadFilter === false ? null : false)
            }
          />
        }
        label="Unread"
        classes={{ label: classes.checkboxLabel }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isArchivedFilter === true}
            onChange={() =>
              setIsArchivedFilter(isArchivedFilter === true ? null : true)
            }
          />
        }
        label="Archived"
        classes={{ label: classes.checkboxLabel }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isArchivedFilter === false}
            onChange={() =>
              setIsArchivedFilter(isArchivedFilter === false ? null : false)
            }
          />
        }
        label="Unarchived"
        classes={{ label: classes.checkboxLabel }}
      />
      {isArchivedFilter !== null || isReadFilter !== null ? (
        <StyledButton
          noHover
          buttonText="Clear"
          variant="contained"
          color="primary"
          minWidth={50}
          onClick={handleClearFilters}
          borderRadius={2}
        />
      ) : (
        <StyledButton
          noHover
          buttonText="Clear"
          variant="contained"
          color="primary"
          onClick={handleClearFilters}
          minWidth={50}
          borderRadius={2}
          disabled
        />
      )}
    </>
  );
};

export default MessageFilterMixin;
