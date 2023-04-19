const filterState = (event, filterItem, state, setState) => {
  event.stopPropagation();
  if (state.includes(filterItem)) {
    setState(state.filter((c) => c !== filterItem));
  } else {
    setState([...state, filterItem]);
  }
};

export { filterState };
