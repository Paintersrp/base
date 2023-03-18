import { TOGGLE_EDITMODE_ON, TOGGLE_EDITMODE_OFF } from "../Actions/editmode";

const initialState = {
  editMode: false,
};

const editmodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EDITMODE_ON:
      return {
        ...state,
        editMode: true,
      };
    case TOGGLE_EDITMODE_OFF:
      return {
        ...state,
        editMode: false,
      };
    default:
      return state;
  }
};

export default editmodeReducer;
