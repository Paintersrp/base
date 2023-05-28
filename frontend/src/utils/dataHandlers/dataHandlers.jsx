const toggleState = (setState, state) => {
  setState(!state);
};

const toggleSwapStates = (
  setPrimaryState,
  primaryState,
  setSecondaryState,
  secondaryState
) => {
  setPrimaryState(!primaryState);
  if (secondaryState) {
    setSecondaryState(!secondaryState);
  }
};

const handleDataChange = (event, setData, data, ignoreChecked = false) => {
  console.log(event.target.value);
  setData({
    ...data,
    [event.target.name]:
      event.target.type === "checkbox"
        ? ignoreChecked
          ? event.target.value
          : event.target.checked
        : event.target.value,
  });
};

const handleNestedDataChange = (event, setData, data, nestedName) => {
  console.log(data, nestedName);
  setData({
    ...data,
    [nestedName]: {
      ...data[nestedName],
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    },
  });
};

export {
  toggleState,
  toggleSwapStates,
  handleDataChange,
  handleNestedDataChange,
};
