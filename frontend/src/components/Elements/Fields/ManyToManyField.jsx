import React, { useEffect, useState } from "react";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import DualList from "./DualList";
import choiceSource from "../../Admin/Objects/AutoForm/choiceSource";

const ManyToManyField = ({
  data = {},
  fieldName,
  handleComponentsChange,
  modelMetadata,
}) => {
  console.log("fieldName", fieldName);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const source = choiceSource(fieldName);

    axiosInstance.get(`/${source}/`).then((response) => {
      setChoices(response.data);
      console.log("YEAH:", response.data);
    });
  }, []);

  const [selectedOptions, setSelectedOptions] = useState(
    data && data.length ? data.map((item) => item) : []
  );

  useEffect(() => {
    handleComponentsChange(fieldName, selectedOptions);
  }, [selectedOptions]);

  return (
    <div style={{ width: "100%" }}>
      {choices && selectedOptions && (
        <React.Fragment>
          <DualList
            fieldName={fieldName}
            selectedOptions={selectedOptions}
            choices={choices}
            handleComponentsChange={handleComponentsChange}
            modelMetadata={modelMetadata}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default ManyToManyField;
